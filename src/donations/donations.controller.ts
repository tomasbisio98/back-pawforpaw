import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { DonationService } from './donations.service';
import { CreateDonationDto } from './dto/createDonations.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

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
  getMyDonation(@Request() req) {
    const userId = req.user.userId;
    return this.donationService.getDonationByUser(userId);
  }
}
