import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NewsletterService {
  private readonly subscribedEmails = new Set<string>();

  constructor(private readonly mailerService: MailerService) {}

  async sendSubscriptionConfirmation(email: string): Promise<void> {
    if (this.subscribedEmails.has(email)) {
      throw new BadRequestException('Ya estás suscrito al newsletter.');
    }

    this.subscribedEmails.add(email);

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
