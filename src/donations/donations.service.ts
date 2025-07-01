import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { DonationDetail } from './entities/donation-detail.entity';
import { DonationDetailDogs } from './entities/donation-detail-dog.entity';
import { CreateDonationDto } from './dto/createDonations.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,

    @InjectRepository(DonationDetail)
    private donationDetailRepo: Repository<DonationDetail>,

    @InjectRepository(DonationDetailDogs)
    private donationDetailDogsRepo: Repository<DonationDetailDogs>,

    private readonly mailer: MailerService,
  ) {}

  // Actualiza el estado de una donación.
  async updateStatus(
    donationId: string,
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED',
  ): Promise<void> {
    const donation = await this.donationRepo.findOne({
      where: { donationId },
      relations: ['user'],
    });

    if (!donation) {
      throw new NotFoundException(`Donación ${donationId} no encontrada`);
    }

    donation.status = status;
    await this.donationRepo.save(donation);

    // ✅ Enviar correo SOLO si es FALLIDO o CANCELADO
    if (status === 'FAILED' || status === 'CANCELED') {
      try {
        const info = await this.mailer.sendMail({
          from: `"Fundación PawForPaw 🐾 Donaciones" <${process.env.MAIL_FROM}>`,
          to: donation.user.email,
          subject: '⚠️ Hubo un problema con tu donación',
          text: `Hola ${donation.user.name}, lamentablemente tu donación de ${donation.totalValue} USD realizada el ${donation.date.toLocaleString()} no pudo procesarse.

Puedes intentar nuevamente ingresando a https://front-pawforpaw-one.vercel.app/perritos

Gracias por tu intención de ayudar a nuestros perritos.`,
          html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #e53935;">⚠️ Hubo un problema con tu donación</h2>
            <p>Hola ${donation.user.name},</p>
            <p>Lamentablemente tu donación de <strong>${donation.totalValue} USD</strong> realizada el <strong>${donation.date.toLocaleString()}</strong> no pudo procesarse.</p>
            <p>Si deseas, puedes volver a intentarlo haciendo clic aquí:</p>
            <a href="https://front-pawforpaw-one.vercel.app/perritos" style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #e53935;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            ">Reintentar Donación</a>
            <p>Gracias por tu intención de ayudar a nuestros perritos.</p>
            <p>Con cariño,<br>El equipo de PawForPaw 🐾</p>
          </div>
        `,
        });
        console.log('✉️ Email de donación fallida enviado:', info);
      } catch (err) {
        console.error('❌ Error enviando email de donación fallida:', err);
      }
    }
  }

  async createDonation(userId: string, dto: CreateDonationDto) {
    // Calcular el valor total
    const totalValue = dto.products.reduce((sum, p) => sum + p.price_unit, 0);

    // Crear la donación
    const donation = this.donationRepo.create({
      userId,
      date: new Date(),
      totalValue,
      status: 'PENDING',
    });
    await this.donationRepo.save(donation);

    for (const product of dto.products) {
      // Crear el detalle del producto donado
      const detail = this.donationDetailRepo.create({
        donationId: donation.donationId,
        product_id: product.productId,
        price_unit: product.price_unit,
      });
      await this.donationDetailRepo.save(detail);

      // Asociar el producto al perrito beneficiado
      for (const dogId of product.dogs) {
        const detailDog = this.donationDetailDogsRepo.create({
          donationDetailId: detail.donationDetailId,
          dogId,
          productId: product.productId,
        });
        await this.donationDetailDogsRepo.save(detailDog);
      }
    }

    return {
      message: 'Donación creada exitosamente',
      donationId: donation.donationId,
      totalValue: donation.totalValue,
    };
  }

  async getDonationByUser(userId: string, page: number, limit: number) {
    const donations = await this.donationRepo.find({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'donationDetails',
        'donationDetails.product',
        'donationDetails.dogAssignments',
        'donationDetails.dogAssignments.dog',
      ],
      order: { date: 'DESC' },
    });

    if (!donations || donations.length === 0) {
      throw new BadRequestException('No tienes donaciones registradas');
    }

    const simpleResponse = donations.flatMap((donation) =>
      donation.donationDetails.flatMap((detail) =>
        detail.dogAssignments.map((assignment) => ({
          donationId: donation.donationId,
          fecha: donation.date,
          producto: detail.product.name,
          perrito: assignment.dog.name,
          monto: parseFloat(donation.totalValue as any),
          estado: donation.status,
        })),
      ),
    );

    return simpleResponse;
  }

  async getHistorial() {
    const historial = await this.donationRepo
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.user', 'user')
      .leftJoinAndSelect('donation.donationDetails', 'detail')
      .leftJoinAndSelect('detail.product', 'product')
      .leftJoinAndSelect('detail.dogAssignments', 'assignment')
      .leftJoinAndSelect('assignment.dog', 'dog')
      .select([
        'donation',
        'user.name',
        'detail',
        'product.name',
        'assignment',
        'dog.name',
      ])
      .getMany();

    const resultado: {
      id: string;
      usuario: string;
      producto: string;
      perrito: string;
      monto: number;
      fecha: string;
      estado: string;
    }[] = [];

    for (const d of historial) {
      if (!Array.isArray(d.donationDetails)) continue;

      for (const detail of d.donationDetails) {
        if (!Array.isArray(detail.dogAssignments)) continue;

        for (const assign of detail.dogAssignments) {
          resultado.push({
            id: d.donationId,
            usuario: d.user?.name || 'Desconocido',
            producto: detail.product?.name || 'Producto',
            perrito: assign.dog?.name || 'Perrito',
            monto: Number(detail.price_unit) || 0,
            fecha: d.date.toISOString().split('T')[0],
            estado: this.mapStatusToFrontend(d.status),
          });
        }
      }
    }

    return resultado;
  }

  private mapStatusToFrontend(status: string): string {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return 'Exitoso';
      case 'PENDING':
        return 'En proceso';
      case 'CANCELED':
      case 'FAILED':
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  }
}
