import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAddress } from './entities/email-address.entity';
import { Contact } from '@features/contact/entities/contact.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class EmailAddressService {
  constructor(
    @InjectRepository(EmailAddress)
    private emailAddressRepository: Repository<EmailAddress>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<EmailAddress>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const actualLimit = Math.min(limit, 100);
    const skip = (page - 1) * actualLimit;

    const [data, total] = await this.emailAddressRepository.findAndCount({
      where: { deleted: false },
      relations,
      order: { [sortBy]: sortOrder.toUpperCase() },
      skip,
      take: actualLimit,
    });

    const totalPages = Math.ceil(total / actualLimit);

    return {
      data,
      total,
      page,
      limit: actualLimit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findOne(id: string, relations?: string[]): Promise<EmailAddress> {
    const emailAddress = await this.emailAddressRepository.findOne({
      where: { id, deleted: false },
      relations,
    });

    if (!emailAddress) {
      throw new NotFoundException(
        `Dirección de email con ID ${id} no encontrada`,
      );
    }

    return emailAddress;
  }

  async findByEmail(
    email: string,
    relations?: string[],
  ): Promise<EmailAddress> {
    // Normalize email to lowercase for consistent searching
    const normalizedEmail = email.toLowerCase().trim();

    const emailAddress = await this.emailAddressRepository.findOne({
      where: {
        emailAddress: normalizedEmail,
        deleted: false,
      },
      relations,
    });

    if (!emailAddress) {
      throw new NotFoundException(`Dirección de email ${email} no encontrada`);
    }

    return emailAddress;
  }

  async getContacts(id: string): Promise<Contact[]> {
    const emailAddress = await this.findOne(id, ['contacts']);
    return emailAddress.contacts;
  }
}
