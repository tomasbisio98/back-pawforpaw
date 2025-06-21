import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './donations.controller';
import { DonationService } from './donations.service';
import { StripeWebhookController } from 'src/stripe/stripe.controller';
import { StripeService } from '../stripe/stripe.service';
import { Donation } from './entities/donation.entity';
import { DonationDetail } from './entities/donation-detail.entity';
import { DonationDetailDogs } from './entities/donation-detail-dog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation, DonationDetail, DonationDetailDogs]),
  ],
  controllers: [DonationController, StripeWebhookController],
  providers: [DonationService, StripeService],
})
export class DonationsModule {}
