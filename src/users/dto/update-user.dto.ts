import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Numero de telefono',
    example: '3201112233',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'estado del usuario',
    example: 'activo',
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/userProfilePhoto.jpg',
  })
  @IsOptional()
  @IsString()
  profileImgUrl?: string;

  @IsOptional()
  @IsBoolean()
  isBanned?: boolean;
}
