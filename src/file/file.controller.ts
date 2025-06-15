import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  ParseUUIDPipe,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // Máximo 200 KB
            message: 'El tamaño del archivo no cumple las validaciones',
          }),
          new FileTypeValidator({
            fileType: /image\/(jpeg|png|webp)/, // Solo imágenes
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadImage(file, productId);
  }
}
