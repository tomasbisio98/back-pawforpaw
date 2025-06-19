import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileRepository } from './file.repository';
import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Dog, User])],
  controllers: [FileController],
  providers: [FilesService, CloudinaryConfig, FileRepository],
})
export class FileModule {}
