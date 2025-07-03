import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignProductsDto {
  @ApiProperty({
    description: 'Id del producto',
    example: 'UUID del producto en la base de datos',
  })
  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
