import { IsString, IsBoolean, IsNumber, IsUrl } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  description: string;

  @IsUrl()
  imgUrl: string;
}

