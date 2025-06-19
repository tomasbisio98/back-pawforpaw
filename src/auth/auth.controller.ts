import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authServices.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authServices.signUp(user);
  }
}
