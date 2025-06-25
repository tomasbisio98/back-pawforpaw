import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
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
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    console.log('📥 Webhook recibido');

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body));

    try {
      const event = this.stripeService.validateWebhook(sig, rawBody);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const donationId = session.metadata?.donationId;

          console.log('✅ Sesión completada:', session.id);

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

          break;
        }

        //logica pago rechazado
        case 'payment_intent.payment_failed': {
          const intent = event.data.object;

          console.log('❌ Pago fallido - Intent ID:', intent.id);
          console.log('🔎 Metadata en intent:', intent.metadata);

          const donationId = intent.metadata?.donationId;

          if (donationId) {
            await this.donationService.updateStatus(donationId, 'CANCELED');
            console.log('❌ Donación marcada como fallida');
          } else {
            console.warn('⚠️ No se encontró donationId en el intent metadata');
          }

          break;
        }

        default:
          console.log(`🔔 Evento ignorado: ${event.type}`);
      }

      return res.status(200).send('ok');
    } catch (err) {
      console.error('❌ Error en webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
