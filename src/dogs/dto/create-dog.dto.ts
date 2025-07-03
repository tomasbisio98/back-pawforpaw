import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsUrl,
  IsOptional,
  IsIn,
  IsDate,
} from 'class-validator';

export class CreateDogDto {
  @ApiProperty({
    description: 'Nombre del perro.',
    example: 'Lucas',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'sexo del perro.',
    example: 'M',
  })
  @IsString()
  @IsIn(['M', 'H'], { message: 'Sex must be either "M" or "H"' })
  sex: 'M' | 'H';

  @ApiProperty({
    description: 'Imagen del perro.',
    example: 'https://example.com/product.jpg',
  })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiProperty({
    description: 'Descripcion del perro.',
    example: 'El perro mas fiel que encontraras!.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Ciudad del perrito.',
    example: 'Bogota',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Estado del perrito en la base de datos',
    example: 'Activo',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    description: 'Fecha de creacion del perrito',
    example: '02/07/2025',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;
}
