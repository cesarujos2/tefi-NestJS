import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAddressService } from './email-address.service';
import { EmailAddressController } from './email-address.controller';
import { EmailAddress } from './entities/email-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAddress])],
  controllers: [EmailAddressController],
  providers: [EmailAddressService],
  exports: [EmailAddressService],
})
export class EmailAddressModule {}
