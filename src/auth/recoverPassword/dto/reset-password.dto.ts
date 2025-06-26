import {
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token requerido' })
  token: string;

  @IsNotEmpty({ message: 'Contraseña requerida' })
  @MinLength(8, { message: 'Mínimo 8 caracteres' })
  @MaxLength(20, { message: 'Máximo 20 caracteres' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    },
    {
      message: 'Debe incluir mayúscula y minúscula',
    },
  )
  newPassword: string;
}
