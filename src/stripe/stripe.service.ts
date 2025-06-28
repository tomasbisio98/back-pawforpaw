import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  }

  async createCheckoutSession(donationId: string, amount: number) {
    try {
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? process.env.FRONTEND_URL
          : `http://localhost:3000`; // 👈 local solo frontend

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
}
