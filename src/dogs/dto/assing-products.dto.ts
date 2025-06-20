import { IsArray, IsString } from 'class-validator';

export class AssignProductsDto {
  @IsArray()
  @IsString({ each: true })
  productIds: string[];
}
