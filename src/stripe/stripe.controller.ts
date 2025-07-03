import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Response, Request } from 'express';
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

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const donationId = session.metadata?.donationId;

          if (!donationId) {
            return res.status(400).send('Missing donationId in metadata');
          }

          await this.donationService.updateStatus(donationId, 'COMPLETED');
          await this.donationMail.sendDonationConfirmation(donationId);
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          const donationId = paymentIntent.metadata?.donationId;
          console.warn('❌ Pago fallido:', paymentIntent.id);

          if (donationId) {
            await this.donationService.updateStatus(donationId, 'FAILED');
          }
          break;
        }

        case 'checkout.session.expired': {
          const session = event.data.object;
          const donationId = session.metadata?.donationId;
          console.warn('⏰ Sesión expirada:', session.id);

          if (donationId) {
            await this.donationService.updateStatus(donationId, 'CANCELED');
          }
          break;
        }

        case 'checkout.session.async_payment_failed': {
          const session = event.data.object;
          const donationId = session.metadata?.donationId;
          console.warn('❌ Pago fallido (async):', session.id);

          if (donationId) {
            await this.donationService.updateStatus(donationId, 'FAILED');
          }
          break;
        }

        default:
      }

      return res.status(200).send('ok');
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
