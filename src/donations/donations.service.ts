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
    status: 'PENDING' | 'COMPLETED' | 'CANCELED',
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

  // Obtiene una donación por su ID, con todas sus relaciones necesarias
  async getDonationById(donationId: string): Promise<any[]> {
    const donation = await this.donationRepo.findOne({
      where: { donationId },
      relations: [
        'user',
        'donationDetails',
        'donationDetails.product',
        'donationDetails.dogAssignments',
        'donationDetails.dogAssignments.dog',
      ],
    });

    if (!donation) {
      throw new NotFoundException(`Donación ${donationId} no encontrada`);
    }

    const simpleResponse = donation.donationDetails.flatMap((detail) =>
      detail.dogAssignments.map((assignment) => ({
        donationId: donation.donationId,
        fecha: donation.date,
        producto: detail.product.name,
        perrito: assignment.dog.name,
        monto: parseFloat(donation.totalValue as any),
        estado: donation.status,
        userId: donation.user?.id,
      })),
    );

    return simpleResponse;
  }
}
