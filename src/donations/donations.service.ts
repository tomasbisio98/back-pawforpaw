import { Injectable, BadRequestException } from '@nestjs/common';
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

  async createDonation(userId: string, dto: CreateDonationDto) {
    //Calcular el valor total
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
      //Crear el detalle del producto donado
      const detail = this.donationDetailRepo.create({
        donationId: donation.donationId,
        product_id: product.productId,
        price_unit: product.price_unit,
      });
      await this.donationDetailRepo.save(detail);

      //Asociar el producto al perrito beneficiado
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
      order: {
        date: 'DESC',
      },
    });

    // Verifica que el usuario sí tenga donaciones.
    if (!donations || donations.length === 0) {
      throw new BadRequestException('No tienes donaciones registradas');
    }

    // Reestructura la respuesta
    const simpleResponse = donations.flatMap((donations) =>
      //flatMap sirve para "aplanar" listas anidadas
      donations.donationDetails.flatMap((detail) =>
        detail.dogAssignments.map((assigment) => ({
          //Objeto simplificado por cada combinación producto + perro
          donationId: donations.donationId,
          fecha: donations.date,
          producto: detail.product.name,
          perrito: assigment.dog.name,
          monto: parseFloat(donations.totalValue as any),
          estado: donations.status,
        })),
      ),
    );

    return simpleResponse;
  }
}
