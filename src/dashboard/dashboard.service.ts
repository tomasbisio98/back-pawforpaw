import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/users.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { DonationDetailDogs } from 'src/donations/entities/donation-detail-dog.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepo: Repository<Dog>,

    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,

    @InjectRepository(DonationDetailDogs)
    private readonly donationDetailDogsRepo: Repository<DonationDetailDogs>,
  ) {}

  async getDashboardData() {
    const totalDogs = await this.dogRepo.count();
    const totalProducts = await this.productRepo.count();
    const totalUsers = await this.userRepo.count();

    const totalDonationsResult = await this.donationRepo
      .createQueryBuilder('donation')
      .select('SUM(donation.totalValue)', 'total')
      .where('donation.status = :status', { status: 'COMPLETED' })
      .getRawOne();

    const totalDonations = parseFloat(totalDonationsResult.total) || 0;

    const topDonatedDogs = await this.donationDetailDogsRepo
      .createQueryBuilder('ddd')
      .leftJoin('ddd.dog', 'dog')
      .leftJoin('ddd.donationDetail', 'detail')
      .leftJoin('detail.donation', 'donation')
      .where('donation.status = :status', { status: 'COMPLETED' })
      .select('dog.name', 'name')
      .addSelect('COUNT(*)', 'donations')
      .groupBy('dog.name')
      .orderBy('donations', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalDogs,
      totalProducts,
      totalUsers,
      totalDonations,
      topDonatedDogs,
    };
  }
}
