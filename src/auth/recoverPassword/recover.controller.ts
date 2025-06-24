import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RecoverService } from './recover.service';
import { User } from 'src/users/users.entity';
import { RecoverMailService } from './RecoverMailService';

@Controller('recover')
export class RecoverController {
  constructor(private readonly recoverService: RecoverService) {}
  private readonly mailerService: RecoverMailService;

  @Post('request-password')
  requestPassword(@Body() dto: RequestPasswordDto) {
    return this.recoverService.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.recoverService.resetPassword(dto.token, dto.newPassword);
  }

  @Get('test-email')
  async testEmail() {
    const fakeUser = {
      name: 'Usuario Test',
      email: 'pawforpaw2025@gmail.com', // usa uno tuyo para verificar
    } as User;

    const token = '1234567890-prueba';
    await this.mailerService.sendRecoveryLink(fakeUser, token);

    return { message: 'Correo de prueba enviado' };
  }
}
