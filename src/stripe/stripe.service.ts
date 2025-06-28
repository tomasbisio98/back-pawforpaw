import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  }

  // ✅ Método para crear la sesión de pago
  async createCheckoutSession(donationId: string, amount: number) {
    try {
<<<<<<< HEAD
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
=======
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? process.env.FRONTEND_URL
          : `http://localhost:3000`; // 👈 local solo frontend
>>>>>>> ebcb65735c7f3f53ca399caa766e1b3508bbc982

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(amount * 100),
              product_data: {
                name: `Donación Fundación PawForPaw`,
                description: `Gracias por apoyarnos`,
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        client_reference_id: donationId,
        success_url: `${baseUrl}/donations/success?donationId=${donationId}`,
        cancel_url: `${baseUrl}/donations/cancel`,
        metadata: { donationId },
        payment_intent_data: {
          metadata: { donationId },
        },
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
