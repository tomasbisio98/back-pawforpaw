import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { mailerConfigFactory } from '../config/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterSubscription } from './entities/subscription.entity';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([NewsletterSubscription]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
