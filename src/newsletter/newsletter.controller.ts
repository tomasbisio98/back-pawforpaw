import { Controller, Post, Body } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(
    @Body() subscriptionDto: CreateSubscriptionDto,
  ): Promise<{ message: string }> {
    await this.newsletterService.sendSubscriptionConfirmation(
      subscriptionDto.email,
    );
    return { message: 'Suscripción exitosa. Revisa tu correo 📩' };
  }
}
