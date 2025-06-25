import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  }

  async createCheckoutSession(donationId: string, amount: number) {
    //Calcula la URL base para redirecciones
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.BACKEND_URL
        : process.env.FRONTEND_URL ||
          `http://localhost:${process.env.PORT || 3001}`;

    //Llama al método de Stripe para crear una sesión de Checkout. Es asíncrono, devuelve un objeto session
    const session = await this.stripe.checkout.sessions.create({
      //Solo permite pagos con tarjeta de crédito/débito.
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', //divisa
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `Donación Fundación PawForPaw`,
              description: `Gracias por apoyarnos`,
            },
          },
          quantity: 1,
        },
      ],
      //Modo de la sesión: pago único inmediato.
      mode: 'payment',

      // Guarda tu donationId como referencia interna, sin mostrarlo al cliente.
      client_reference_id: donationId,

      success_url: `${baseUrl}/donations/success?donationId=${donationId}`,
      cancel_url: `${baseUrl}/donations/cancel`,
      metadata: {
        donationId,
      },
      payment_intent_data: {
        metadata: {
          donationId,
        },
      },
    });
    return { url: session.url };
  }
  // para verificar la firma de los eventos webhook de Stripe.
  validateWebhook(sig: string, body: Buffer): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  }
}
