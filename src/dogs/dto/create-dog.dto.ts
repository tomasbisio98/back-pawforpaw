import {
  IsString,
  IsBoolean,
  IsNumber,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  description: string;

  @IsUrl()
  imgUrl: string;
}
