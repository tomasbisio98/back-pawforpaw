import { IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsString()
  profileImgUrl?: string; // ✅ Este campo debe existir

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
