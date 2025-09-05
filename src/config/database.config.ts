import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Set to false for production and read-only operations
  logging: process.env.NODE_ENV === 'development',
  timezone: 'Z',
  charset: 'utf8mb4',
  retryAttempts: 3,
  retryDelay: 3000,
  autoLoadEntities: true,
  extra: {
    connectionLimit: 10,
  },
});
