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
        from: `"Fundación PawForPaw Donaciones" <no-reply@pawforpaw.org>`,
        to: donation.user.email,
        subject: '✅ ¡Tu donación fue exitosa!',
        html: `
          <h1>Hola ${donation.user.name}, gracias por donar</h1>
          <p>Monto: ${donation.totalValue} USD</p>
          <p>Fecha: ${donation.date.toLocaleString()}</p>
        `,
      });
      console.log('✉️ Email enviado:', info);
    } catch (err) {
      console.error('❌ Error enviando email:', err);
    }
  }
}
