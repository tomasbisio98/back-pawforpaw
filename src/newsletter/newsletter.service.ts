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
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background-color: #ffffff; color: #333333; border-radius: 8px;">
      <h1 style="color: #e67e22; text-align: center;">¡Gracias por sumarte! 🐾</h1>
      <p style="font-size: 16px; line-height: 1.5; text-align: center;">
        Ahora recibirás novedades, actividades y noticias de la Fundación PawForPaw.
      </p>
      <p style="font-size: 16px; line-height: 1.5; text-align: center;">
        Si tenés preguntas, escribinos cuando quieras. Estamos felices de que seas parte de nuestra comunidad.
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://front-pawforpaw-one.vercel.app" style="background-color: #e67e22; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">Visitar Fundación</a>
      </div>
      <p style="text-align: center; font-size: 14px; color: #555; margin-top: 20px;">Gracias por apoyar nuestra causa 🐶❤️</p>
    </div>
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
