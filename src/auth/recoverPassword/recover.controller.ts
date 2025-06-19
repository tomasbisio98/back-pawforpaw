import { Body, Controller, Post } from '@nestjs/common';
import { RequestPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RecoverService } from './recover.service';

@Controller('recover')
export class RecoverController {
  constructor(private readonly recoverService: RecoverService) {}

  @Post('request-password')
  requestPassword(@Body() dto: RequestPasswordDto) {
    return this.recoverService.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.recoverService.resetPassword(dto.token, dto.newPassword);
  }
}
