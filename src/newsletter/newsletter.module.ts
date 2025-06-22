import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { mailerConfigFactory } from '../config/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterSubscription } from './entities/subscription.entity';
import {
  NewsletterCron,
  NewsletterCronTestController,
} from './cron/newsletter.cron';
import { Dog } from 'src/dogs/entities/dog.entity';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([NewsletterSubscription, Dog]),
  ],
  controllers: [NewsletterController, NewsletterCronTestController],
  providers: [NewsletterService, NewsletterCron],
  exports: [NewsletterService],
})
export class NewsletterModule {}
