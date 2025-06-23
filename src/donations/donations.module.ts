import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './donations.controller';
import { DonationService } from './donations.service';
import { StripeWebhookController } from 'src/stripe/stripe.controller';
import { StripeService } from '../stripe/stripe.service';
import { Donation } from './entities/donation.entity';
import { DonationDetail } from './entities/donation-detail.entity';
import { DonationDetailDogs } from './entities/donation-detail-dog.entity';
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DonationMailService } from './donations.mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation, DonationDetail, DonationDetailDogs]),
    UsersModule,
    MailerModule,
  ],
  controllers: [DonationController, StripeWebhookController],
  providers: [DonationService, StripeService, DonationMailService],
})
export class DonationsModule {}
