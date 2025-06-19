import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationService } from './donations.service';
import { DonationController } from './donations.controller';
import { Donation } from './entities/donation.entity';
import { DonationDetail } from './entities/donation-detail.entity';
import { DonationDetailDogs } from './entities/donation-detail-dog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation, DonationDetail, DonationDetailDogs]),
  ],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
