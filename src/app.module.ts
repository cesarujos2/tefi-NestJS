import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './core/config/database.config';
import { getSqliteConfig } from './core/config/sqlite.config';
import { DatabaseModule } from './core/database/database.module';
import { FitacModule } from './features/fitac/fitac.module';
import { ProjectModule } from './features/project/project.module';
import { AccountModule } from './features/account/account.module';
import { AuthModule } from './features/auth/auth.module';
import { ContactModule } from './features/contact/contact.module';
import { EmailAddressModule } from './features/email_address/email-address.module';

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
    TypeOrmModule.forRootAsync({
      name: 'sqlite',
      imports: [ConfigModule],
      useFactory: getSqliteConfig,
      inject: [ConfigService],
    }),
    DatabaseModule,
    FitacModule,
    ProjectModule,
    AccountModule,
    AuthModule,
    ContactModule,
    EmailAddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
