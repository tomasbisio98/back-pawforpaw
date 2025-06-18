import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from './file/file.module';
import typeorm from './config/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { SeedModule } from './seeder/seeder.module';
import { JwtModule } from '@nestjs/jwt';

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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    FileModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

console.log('hola');
