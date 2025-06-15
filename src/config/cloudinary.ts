import { v2 as cloudinary } from 'cloudinary'; // Cliente oficial de Cloudinary
import { config as dotenvConfig } from 'dotenv'; // Carga variables de entorno

// Carga variables desde archivo .env.development
dotenvConfig({ path: '.env.development' });

// Exporta la configuración como un proveedor de NestJS
export const CloudinaryConfig = {
  provide: 'CLOUDINARY', // Nombre del proveedor inyectable
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  },
};
