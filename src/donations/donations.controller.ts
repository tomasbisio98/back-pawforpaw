import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  }

  async createCheckoutSession(donationId: string, amount: number) {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000';

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donación PawForPaw',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/donations/success?donationId=${donationId}`,
      cancel_url: `${baseUrl}/donations/cancel`,
      metadata: {
        donationId, // ✅ esto es lo que te faltaba
      },
    });

    return session;
  }
}
