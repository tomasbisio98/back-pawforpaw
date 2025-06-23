import { Module } from '@nestjs/common';
import { NewsletterModule } from '../newsletter/newsletter.module';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [NewsletterModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
