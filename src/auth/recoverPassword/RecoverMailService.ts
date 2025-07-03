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
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background-color: #ffffff; color: #333333; border-radius: 8px;">
      <h2 style="color: #e67e22; text-align: center;">Hola ${user.name ?? 'usuario'},</h2>
      <p style="font-size: 16px; line-height: 1.5; text-align: center;">
        Haz clic en el siguiente enlace para restablecer tu contraseña:
      </p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${recoveryUrl}" target="_blank" style="color: #e67e22; word-break: break-all;">${recoveryUrl}</a>
      </p>
      <p style="font-size: 14px; line-height: 1.5; color: #555; text-align: center;">
        Este enlace expirará en 1 hora.
      </p>
    </div>
  `,
    });
  }
}
