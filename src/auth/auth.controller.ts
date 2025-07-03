import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.services';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authServices.signIn(email, password);
  }

  @ApiOperation({ summary: 'register' })
  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authServices.signUp(user);
  }

  @ApiOperation({ summary: 'Log in with google' })
  @Post('google')
  googleLogin(@Body() body: { idToken: string }) {
    return this.authServices.googleLogin(body.idToken);
  }
}
