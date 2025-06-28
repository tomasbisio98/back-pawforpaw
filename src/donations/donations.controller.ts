import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DonationService } from './donations.service';
import { CreateDonationDto } from './dto/createDonations.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StripeService } from 'src/stripe/stripe.service';
import { Roles } from 'src/decorators/role/decorators.role';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';

@Controller('donations')
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly stripeService: StripeService,
  ) {}

  // Rutas públicas
  @Get('success')
  handleSuccess(@Query('donationId') donationId: string) {
    return { status: 'success', donationId };
  }

  @Get('cancel')
  handleCancel() {
    return { status: 'canceled' };
  }

  // Rutas protegidas
  @Get('mine')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getMyDonation(
    @Request() req,
    @Query('page') page?: string,
    @Query('limin') limit?: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 9;
    const userId = req.user.userId;
    return this.donationService.getDonationByUser(userId, pageNum, limitNum);
  }

  @Post('checkout')
  @UseGuards(AuthGuard)
  async checkout(@Request() req, @Body() dto: CreateDonationDto) {
    const userId = req.user.userId;
    console.log('🧾 Payload recibido:', JSON.stringify(dto, null, 2));

    const donation = await this.donationService.createDonation(userId, dto);
    const session = await this.stripeService.createCheckoutSession(
      donation.donationId,
      donation.totalValue,
    );

    console.log('🔗 Stripe session:', session);
    return { url: session.url }; // ✅ DEVUELVE SOLO LA URL
  }

  @Get('historial')
  async getHistorial() {
    return this.donationService.getHistorial();
  }
}
