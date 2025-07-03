import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class DonationMailService {
  constructor(
    private mailer: MailerService,
    @InjectRepository(Donation)
    private donationRepo: Repository<Donation>,
  ) {}

  async sendDonationConfirmation(donationId: string) {
    // 1. Carga la donación con relaciones necesarias
    const donation = await this.donationRepo.findOne({
      where: { donationId },
      relations: ['user'],
    });

    if (!donation || !donation.user) {
      throw new NotFoundException(`Donación o usuario no encontrados`);
    }

    // 2. Envía el correo
    try {
      const info = await this.mailer.sendMail({
        from: `"Fundación PawForPaw 🐾 Donaciones" <${process.env.MAIL_FROM}>`,
        to: donation.user.email,
        subject: '✅ ¡Tu donación fue exitosa!',
        text: `Hola ${donation.user.name}, gracias por tu donación de ${donation.totalValue} USD el ${donation.date.toLocaleString()}. ¡Gracias por ayudar a nuestros perritos!`,
        html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #4CAF50;">🐾 ¡Gracias por tu donación, ${donation.user.name}!</h2>
        <p>Tu contribución de <strong>${donation.totalValue} USD</strong> realizada el <strong>${donation.date.toLocaleString()}</strong> nos ayuda a seguir cuidando y alimentando a nuestros perritos mientras esperan un hogar.</p>
        <p>Puedes seguir viendo a los perritos disponibles en adopción aquí:</p>
        <a href="https://front-pawforpaw-one.vercel.app/perritos" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        ">Ver Perritos</a>
        <p>¡Gracias por ser parte de este cambio!</p>
        <p>Con cariño,<br>El equipo de PawForPaw 🐾</p>
      </div>
    `,
      });
    } catch (err) {
      console.error('❌ Error enviando email:', err);
    }
  }
}
