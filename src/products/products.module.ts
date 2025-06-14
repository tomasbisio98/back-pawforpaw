// import { Module } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Products } from './entities/products.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Products])],
//   providers: [ProductsService],
//   controllers: [ProductsController],
// })
// export class ProductsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
