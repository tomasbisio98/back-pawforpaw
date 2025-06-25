import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { NewsletterSubscription } from './entities/subscription.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly mailerService: MailerService,

    @InjectRepository(NewsletterSubscription)
    private readonly subscriptionRepo: Repository<NewsletterSubscription>,

    @InjectRepository(Dog)
    private readonly dogRepo: Repository<Dog>,
  ) {}

  async sendSubscriptionConfirmation(email: string): Promise<void> {
    const existing = await this.subscriptionRepo.findOne({ where: { email } });

    if (existing) {
      throw new BadRequestException('Ya estás suscrito al newsletter.');
    }

    const subscription = this.subscriptionRepo.create({ email });
    await this.subscriptionRepo.save(subscription);

    await this.mailerService.sendMail({
      from: `"Fundación PawForPaw" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: 'Gracias por suscribirte a nuestro newsletter ❤️',
      html: `
        <h1>¡Gracias por sumarte!</h1>
        <p>Recibirás novedades, actividades y noticias de la fundación.</p>
        <p>Si tenés preguntas, escribinos cuando quieras.</p>
      `,
    });
  }

  async getAllSubscribers(): Promise<NewsletterSubscription[]> {
    return this.subscriptionRepo.find();
  }

  async sendCustomEmail(
    email: string,
    subject: string,
    html: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

  async getDogsCreatedLastWeek(): Promise<Dog[]> {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    return this.dogRepo.find({
      where: {
        createdAt: Between(oneWeekAgo, now),
      },
    });
  }
}
