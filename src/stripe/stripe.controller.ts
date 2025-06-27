import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Response, Request } from 'express';
import getRawBody from 'raw-body';
import { StripeService } from './stripe.service';
import { DonationService } from '../donations/donations.service';
import { DonationMailService } from '../donations/donations.mail.service';

@Controller('stripe/webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly donationService: DonationService,
    private donationMail: DonationMailService,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    try {
      // ✅ validar con el body crudo
      const event = this.stripeService.validateWebhook(sig, req.body);

      console.log('📥 Webhook recibido:', event.type);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const donationId = session.metadata?.donationId;
        console.log('✅ Sesión completada:', session.id);

        if (!donationId) {
          return res.status(400).send('Missing donationId in metadata');
        }

        await this.donationService.updateStatus(donationId, 'COMPLETED');
        await this.donationMail.sendDonationConfirmation(donationId);
        console.log('📬 Correo enviado correctamente');
      }

      return res.status(200).send('ok');
    } catch (err) {
      console.error('❌ Error en webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
