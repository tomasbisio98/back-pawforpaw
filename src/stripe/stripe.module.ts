import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DonationsModule } from 'src/donations/donations.module';
import { UsersModule } from 'src/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [DonationsModule, UsersModule, MailerModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
