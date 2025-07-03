import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Email con el cual te registraras a la newsletter',
    example: 'nicolas@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
