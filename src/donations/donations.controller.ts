import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
  Query,
  Param,
  ForbiddenException,
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

  // --- RUTAS PÚBLICAS PRIMERO (sin token) ---
  @Get('success')
  handleSuccess(@Query('donationId') donationId: string) {
    return { status: 'success', donationId };
    // O redirige así:
    // return res.redirect(`https://tu-frontend.com/gracias?donationId=${donationId}`);
  }

  @Get('cancel')
  handleCancel() {
    return { status: 'cancelled' };
  }

  // --- RUTAS PROTEGIDAS DESPUÉS ---
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOne(@Param('id') donationId: string, @Request() req) {
    const donation = await this.donationService.getDonationById(donationId);

    const firstDonation = donation[0];
    if (!firstDonation || firstDonation.userId !== req.user.userId) {
      throw new ForbiddenException('No tienes acceso a esta donación');
    }

    return donation; // ✅ esto resuelve el error
  }
}
