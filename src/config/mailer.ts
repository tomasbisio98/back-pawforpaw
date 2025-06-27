import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { TransportOptions } from 'nodemailer';

export const mailerConfigFactory = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    host: configService.get('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    auth: {
      user: configService.get('MAIL_USER'),
      pass: configService.get('MAIL_PASS'),
    },
  } as TransportOptions,
  defaults: {
    from: `"Fundación PawForPaw" <${configService.get('MAIL_FROM')}>`,
  },
});
