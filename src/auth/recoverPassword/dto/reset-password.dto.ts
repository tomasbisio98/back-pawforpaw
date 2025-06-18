import {
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
  })
  newPassword: string;
}
