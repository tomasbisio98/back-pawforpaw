import { IsString, IsBoolean, IsUrl, IsOptional } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsString()
  sex: 'M' | 'H';

  @IsUrl()
  imgUrl: string;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
