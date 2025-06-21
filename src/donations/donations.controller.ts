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

@Controller('donations')
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly stripeService: StripeService,
  ) {}

  // Crear donación (autenticado)
  @UseGuards(AuthGuard)
  @Post()
  createDonation(@Request() req, @Body() dto: CreateDonationDto) {
    const userId = req.user.userId;
    return this.donationService.createDonation(userId, dto);
  }

  // Obtener la donación del usuario actual
  @UseGuards(AuthGuard)
  @Get('mine')
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

  //integracion Stripe
  @UseGuards(AuthGuard)
  @Post('checkout')
  async checkout(@Request() req, @Body() dto: CreateDonationDto) {
    const userId = req.user.userId;
    const donation = await this.donationService.createDonation(userId, dto);

    return this.stripeService.createCheckoutSession(
      donation.donationId,
      donation.totalValue,
    );
  }

  // --- RUTAS PÚBLICAS PARA EL REDIRECT DE STRIPE ---
  // GET /donations/success
  @Get('success')
  handleSuccess(@Query('donationId') donationId: string) {
    // Puedes devolver JSON:
    return { status: 'success', donationId };
    // —o— redirigir al front cuando ya exista:
    // return res.redirect(`https://tufront.com/success?donationId=${donationId}`);
  }

  // GET /donations/cancel
  @Get('cancel')
  handleCancel() {
    return { status: 'cancelled' };
  }
}
