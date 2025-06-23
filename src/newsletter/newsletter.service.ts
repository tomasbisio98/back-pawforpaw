import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterSubscription } from './entities/subscription.entity';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(NewsletterSubscription)
    private readonly subscriptionRepo: Repository<NewsletterSubscription>,
  ) {}

  async sendSubscriptionConfirmation(email: string): Promise<void> {
    const existing = await this.subscriptionRepo.findOne({ where: { email } });

    if (existing) {
      throw new BadRequestException('Ya estás suscrito al newsletter.');
    }

    const subscription = this.subscriptionRepo.create({ email });
    await this.subscriptionRepo.save(subscription);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Gracias por suscribirte a nuestro newsletter ❤️',
      html: `
        <h1>¡Gracias por sumarte!</h1>
        <p>Recibirás novedades, actividades y noticias de la fundación.</p>
        <p>Si tenés preguntas, escribinos cuando quieras.</p>
      `,
    });
  }
}
