import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nombre del producto.',
    example: 'Vacuna',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    description:
      'Precio del producto. Debe ser un número positivo con máximo 2 decimales.',
    example: 199.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;

  @ApiProperty({
    description: 'URL opcional de la imagen del producto.',
    example: 'https://example.com/product.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'true || fale',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
