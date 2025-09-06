import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import { ContactCustom } from './entities/contact-custom.entity';

/**
 * Contact module following Single Responsibility Principle
 * Configures contact-related components and dependencies
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, ContactCustom]), // MySQL connection
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
