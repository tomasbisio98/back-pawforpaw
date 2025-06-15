import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  status?: boolean;

  @IsNotEmpty()
  dogId: number;
}
