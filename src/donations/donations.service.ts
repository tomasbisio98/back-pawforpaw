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

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,

    @InjectRepository(DonationDetail)
    private donationDetailRepo: Repository<DonationDetail>,

    @InjectRepository(DonationDetailDogs)
    private donationDetailDogsRepo: Repository<DonationDetailDogs>,
  ) {}

  // Actualiza el estado de una donación.
  async updateStatus(
    donationId: string,
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELED',
  ): Promise<void> {
    const result = await this.donationRepo.update({ donationId }, { status });
    if (result.affected === 0) {
      throw new NotFoundException(`Donación ${donationId} no encontrada`);
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
