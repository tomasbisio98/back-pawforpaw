import { Controller, Post, Req, Res, Headers, Inject } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DonationService } from '../donations/donations.service';
import { Response, Request } from 'express';
import Stripe from 'stripe';

@Controller('stripe/webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly donationService: DonationService,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    console.log('📩 Recibido evento Stripe en /webhook');

    const payload = req.body as Buffer;

    try {
      const event = this.stripeService.validateWebhook(sig, payload);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('✅ Sesión completada:', session.id);

        const donationId = session.metadata?.donationId;
        if (!donationId) {
          console.error('❌ donationId faltante en metadata');
          return res.status(400).send('Missing donationId in metadata');
        }

        await this.donationService.updateStatus(donationId, 'COMPLETED');
        console.log(`✅ Donación ${donationId} actualizada a COMPLETED`);
      }

      return res.status(200).send('ok');
    } catch (err) {
      console.error('❌ Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
