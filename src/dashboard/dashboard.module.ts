import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/users.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { DonationDetailDogs } from 'src/donations/entities/donation-detail-dog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dog,
      Products,
      User,
      Donation,
      DonationDetailDogs,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
