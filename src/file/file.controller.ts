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
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  private readonly filePipe = new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 200000, // Máximo 200 KB
        message: 'El tamaño del archivo no cumple las validaciones',
      }),
      new FileTypeValidator({
        fileType: /image\/(jpeg|png|webp)/, // Solo imágenes
      }),
    ],
  });

  @Post('uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000, // 1 MB
            message: 'El archivo es demasiado grande. Máx. 1MB.',
          }),
          new FileTypeValidator({
            fileType: /image\/(jpeg|jpg|png|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadProductImage(file, productId);
  }

  @Post('uploadDogImage/:dogId')
  @UseInterceptors(FileInterceptor('file'))
  uploadDogImage(
    @Param('dogId', ParseUUIDPipe) dogId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000, // 1 MB
            message: 'El archivo es demasiado grande. Máx. 1MB.',
          }),
          new FileTypeValidator({
            fileType: /image\/(jpeg|jpg|png|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadDogImage(file, dogId);
  }

  @Post('uploadUserImage/:userId')
  @UseInterceptors(FileInterceptor('file'))
  uploadUserImage(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadUserImage(file, userId);
  }

  @Post('uploadProductImage')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImageOnly(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000, // 1 MB
            message: 'El archivo es demasiado grande. Máx. 1MB.',
          }),
          new FileTypeValidator({
            fileType: /image\/(jpeg|jpg|png|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadProductImageOnly(file); // ✅ ahora existe
  }
}
