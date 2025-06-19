import { IsArray, IsUUID, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDonationDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  price_unit: number;

  @IsArray()
  @IsUUID('all', { each: true })
  dogs: string[]; // Por ahora uno solo, pero acepta varios a futuro
}

export class CreateDonationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDonationDto)
  products: ProductDonationDto[];
}
