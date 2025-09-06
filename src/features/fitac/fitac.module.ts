import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitacService } from './fitac.service';
import { FitacController } from './fitac.controller';
import { Fitac } from './entities/fitac.entity';
import { FitacCustom } from './entities/fitac-custom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fitac, FitacCustom])],
  controllers: [FitacController],
  providers: [FitacService],
  exports: [FitacService],
})
export class FitacModule {}
