import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'; // API de Cloudinary
import toStream from 'buffer-to-stream'; // Convierte buffer a stream para envío

@Injectable()
export class FileRepository {
  // Sube una imagen a Cloudinary usando stream y retorna la respuesta
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Detecta automáticamente el tipo de archivo
        (error, result) => {
          if (error) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          } else {
            resolve(result!); // Retorna resultado exitoso
          }
        },
      );
      toStream(file.buffer).pipe(upload); // Envía el archivo como stream
    });
  }
}
