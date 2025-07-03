import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordDto {
  @ApiProperty({
    description: 'Email con el cual recuperaras tu password',
    example: 'mariana@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
