import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'nombre del Usuario.',
    example: 'Juan Guaro',
  })
  @IsNotEmpty({ message: '¡Name is required!' })
  @IsString({ message: '¡Name must be a string!' })
  @MinLength(3, { message: '¡Name must be at least 3 characters long!' })
  @MaxLength(50, { message: '¡Name must not exceed 50 characters!' })
  name: string;

  @ApiProperty({
    description: 'Correo electronico el usuario',
    example: 'JuanGuaro@gmail.com',
  })
  @IsNotEmpty({ message: '¡Email is required!' })
  @IsEmail({}, { message: '¡Email format is invalid!' })
  email: string;

  @ApiProperty({
    description: 'password del usuario',
    example: 'Hola123!',
  })
  @IsNotEmpty({ message: '!Password is required!' })
  @IsString({ message: '¡Password must be a string!' })
  @MinLength(8, { message: '¡Password must be at least 8 characters long!' })
  @MaxLength(20, { message: '¡Password must not exceed 20 characters!' })
  @IsStrongPassword(
    {
      minUppercase: 1,
      minLowercase: 1,
    },
    {
      message:
        '¡Password must contain at least 1 uppercase and 1 lowercase letter!',
    },
  )
  password: string;

  @IsEmpty()
  isAdmin?: boolean;

  @ApiProperty({
    description: 'Numero de telefono del usuario',
    example: '3215559900',
  })
  @IsNotEmpty({ message: '¡Phone number is required!' })
  @IsString({ message: '¡Phone must be a string!' })
  phone: string;

  @IsEmpty()
  status?: boolean;
}
