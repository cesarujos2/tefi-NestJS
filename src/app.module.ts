import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './core/config/database.config';
import { DatabaseModule } from './core/database/database.module';
import { FitacModule } from './features/fitac/fitac.module';
import { ProjectModule } from './features/project/project.module';
import { AccountModule } from './features/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    DatabaseModule,
    FitacModule,
    ProjectModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
