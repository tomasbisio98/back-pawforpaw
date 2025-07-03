import { IsArray, IsUUID, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDonationDto {
  @ApiProperty({
    description: 'Id del producto',
    example: 'UUID Del producto asignado en la base de datos',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: '100.00',
  })
  @IsNumber()
  price_unit: number;

  @ApiProperty({
    description: 'Id del perrito',
    example: 'UUID del perrito asignado en la base de datos',
  })
  @IsArray()
  @IsUUID('all', { each: true })
  dogs: string[];
}

export class CreateDonationDto {
  @ApiProperty({
    description: 'Array de productos donados',
    example: '[Collar de juguete, Pelota para perros]',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDonationDto)
  products: ProductDonationDto[];
}
