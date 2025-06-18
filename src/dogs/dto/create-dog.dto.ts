import { IsString, IsBoolean, IsUrl, IsOptional, IsIn } from 'class-validator';

export class CreateDogDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['M', 'H'], { message: 'Sex must be either "M" or "H"' })
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
