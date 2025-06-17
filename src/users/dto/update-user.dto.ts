import { IsEmail, IsOptional, IsString, Length, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  password?: string;

  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @IsOptional()
  @IsString()
  @Length(3, 80)
  country?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  city?: string;
}