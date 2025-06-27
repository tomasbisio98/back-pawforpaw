import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/users.entity';

@Injectable()
export class RecoverMailService {
  constructor(private readonly mailer: MailerService) {}

  async sendRecoveryLink(user: User, token: string) {
    const recoveryUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await this.mailer.sendMail({
      from: `"Fundación PawForPaw" <${process.env.MAIL_FROM}>`,
      to: user.email,
      subject: '🔑 Recupera tu contraseña',
      html: `
        <h2>Hola ${user.name ?? 'usuario'},</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <p><a href="${recoveryUrl}" target="_blank">${recoveryUrl}</a></p>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });
  }
}
