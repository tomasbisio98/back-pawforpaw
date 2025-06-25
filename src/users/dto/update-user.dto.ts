import {
  IsOptional,
  IsString,
  Length,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
