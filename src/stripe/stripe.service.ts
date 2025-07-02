import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  }

  // ✅ Método para crear la sesión de pago
  // src/stripe/stripe.service.ts

  async createCheckoutSession(donationId: string, amount: number) {
    try {
      const frontUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(amount * 100), // Stripe usa centavos
              product_data: {
                name: 'Donación a PawForPaw 🐾',
                description: 'Gracias por apoyar a nuestros peluditos 💚',
                images: [
                  'https://res.cloudinary.com/dziccimdv/image/upload/v1751331518/ue9ejehyebvsawib57px.png',
                ],
              },
            },
            quantity: 1,
          },
        ],

        mode: 'payment',
        client_reference_id: donationId,

        // 🔁 Redirección al frontend
        success_url: `${frontUrl}/donations/success?donationId=${donationId}`,
        cancel_url: `${frontUrl}/donations/cancel?donationId=${donationId}`,

        // 🌐 Idioma del checkout
        locale: 'es',

        // 💾 Información útil para trazabilidad
        metadata: { donationId },
        payment_intent_data: {
          metadata: { donationId },
        },

        // ❌ No solicitar dirección de envío
        shipping_address_collection: undefined,
      });

      return { url: session.url };
    } catch (error) {
      console.error('❌ Error creando sesión de Stripe:', error);
      throw error;
    }
  }

  // ✅ Método para validar el webhook (firmado)
  validateWebhook(signature: string, payload: Buffer): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
      return event;
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      throw err;
    }
  }
}
