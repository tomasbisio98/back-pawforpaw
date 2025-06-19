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
import { RecoverModule } from './auth/recoverPassword/recover.module';
import { DonationModule } from './donations/donations.module';

@Module({
  imports: [
    ProductsModule,
    SeedModule,
    DogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
    FileModule,
    UsersModule,
    AuthModule,
    RecoverModule,
    DonationModule,
  ],
})
export class AppModule {}
