import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { NewsletterModule } from 'src/newsletter/newsletter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Products]), NewsletterModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
