import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from './file/file.module';
import typeorm from './config/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { SeedModule } from './seeder/seeder.module';

@Module({
  imports: [
    ProductsModule,
    SeedModule,
    DogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    FileModule,
  ],
})
export class AppModule {}
