import { Controller, Post, Req, Res, Headers, Inject } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DonationService } from '../donations/donations.service';
import { Response, Request } from 'express';
import { DonationMailService } from 'src/donations/donations.mail.service';

@Controller('stripe/webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly donationService: DonationService,
    private donationMail: DonationMailService,
  ) {}
  @Post()
  async handleWebhook(
    @Req() req: Request & { body: Buffer },
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    console.log('📥 Webhook recibido'); // ESTE LOG DEBE SALIR
    const rawBody = req.body;

    try {
      const event = this.stripeService.validateWebhook(sig, rawBody);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('✅ Sesión completada:', session.id);

        const donationId = session.metadata?.donationId;
        if (!donationId) {
          return res.status(400).send('Missing donationId in metadata');
        }

        await this.donationService.updateStatus(donationId, 'COMPLETED');

        try {
          await this.donationMail.sendDonationConfirmation(donationId);
          console.log('📬 Correo enviado correctamente');
        } catch (error) {
          console.error('❌ Error al enviar correo:', error);
        }
      }

      return res.status(200).send('ok');
    } catch (err) {
      console.error('❌ Error en webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
