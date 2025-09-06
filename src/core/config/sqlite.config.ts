import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Session } from '@features/auth/entities/session.entity';

export const getSqliteConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  name: 'sqlite',
  type: 'sqlite',
  database: configService.get<string>('SQLITE_DB_PATH') || './data/sessions.db',
  entities: [Session],
  synchronize: true, // Auto-create tables for SQLite
  logging: process.env.NODE_ENV === 'development',
  autoLoadEntities: false,
});
