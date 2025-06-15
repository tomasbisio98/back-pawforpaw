import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileRepository } from './file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileController],
  providers: [FilesService, CloudinaryConfig, FileRepository],
})
export class FileModule {}
