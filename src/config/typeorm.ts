import { config as dotenvconfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvconfig({ path: '.env.development' });
const config: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}` || 'localhost',
  port: +`${process.env.DB_PORT}` || 5432,
  username: `${process.env.DB_USER}` || 'postgres',
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  dropSchema: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
