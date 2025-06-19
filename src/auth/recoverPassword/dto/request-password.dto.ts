import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
