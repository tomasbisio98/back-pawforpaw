import { Module } from '@nestjs/common';
import { ProductosModule } from './products/products.module';

@Module({
  imports: [ProductosModule],
})
export class AppModule {}
