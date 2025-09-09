import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitacService } from './fitac.service';
import { FitacController } from './fitac.controller';
import { Fitac } from './entities/fitac.entity';
import { FitacCustom } from './entities/fitac-custom.entity';
import { Contact } from '@features/contact/entities/contact.entity';
import {
  TefiService,
  TefiConfigService,
  TefiPdfGeneratorService,
} from '@shared/services/tefi';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fitac, FitacCustom, Contact]), // MySQL connection
  ],
  controllers: [FitacController],
  providers: [
    FitacService,
    TefiService,
    TefiConfigService,
    TefiPdfGeneratorService,
  ],
  exports: [FitacService],
})
export class FitacModule {}
