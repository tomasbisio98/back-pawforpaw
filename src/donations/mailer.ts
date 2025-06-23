import { ConfigService } from '@nestjs/config';

export const mailerConfigFactory = (config: ConfigService) => ({
  transport: {
    host: config.get<string>('MAIL_HOST'),
    port: config.get<number>('MAIL_PORT'),
    secure: config.get<number>('MAIL_PORT') === 465,
    requireTLS: config.get<number>('MAIL_PORT') === 587,
    auth: {
      user: config.get<string>('MAIL_USER'),
      pass: config.get<string>('MAIL_PASS'),
    },
  },
  defaults: {
    from: config.get<string>('MAIL_FROM'),
  },
});
