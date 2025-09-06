import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { PaginationDto, PaginatedResponse } from '@shared/dto/pagination.dto';

/**
 * Contact service following Single Responsibility Principle
 * Handles all contact-related business logic and database operations
 */
@Injectable()
export class ContactService {
  private defaultRelations = ['customFields'];

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  /**
   * Find all contacts with pagination and optional relations
   */
  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Contact>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Contact> = {
      where: { deleted: false },
      skip,
      take: limit,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
    };

    if (relations && relations.length > 0) {
      findOptions.relations = this.getContactRelations(relations);
    }

    const [contacts, total] =
      await this.contactRepository.findAndCount(findOptions);

    const currentPage = page;
    const currentLimit = limit;
    const totalPages = Math.ceil(total / currentLimit);

    return {
      data: contacts,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }

  /**
   * Find contacts by assigned user with pagination
   */
  async findByAssignedUser(
    assignedUserId: string,
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Contact>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Contact> = {
      where: {
        assignedUserId,
        deleted: false,
      },
      skip,
      take: limit,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
    };

    if (relations && relations.length > 0) {
      findOptions.relations = this.getContactRelations(relations);
    }

    const [contacts, total] =
      await this.contactRepository.findAndCount(findOptions);

    const currentPage = page;
    const currentLimit = limit;
    const totalPages = Math.ceil(total / currentLimit);

    return {
      data: contacts,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }

  /**
   * Find contacts by name (first name or last name) with pagination
   */
  async findByName(
    name: string,
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Contact>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Contact> = {
      where: [
        {
          firstName: Like(`%${name}%`),
          deleted: false,
        },
        {
          lastName: Like(`%${name}%`),
          deleted: false,
        },
      ],
      skip,
      take: limit,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
    };

    if (relations && relations.length > 0) {
      findOptions.relations = this.getContactRelations(relations);
    }

    const [contacts, total] =
      await this.contactRepository.findAndCount(findOptions);

    const currentPage = page;
    const currentLimit = limit;
    const totalPages = Math.ceil(total / currentLimit);

    return {
      data: contacts,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }
  /**
   * Find a single contact by ID
   */
  async findOne(id: string, relations?: string[]): Promise<Contact> {
    const findOptions: FindManyOptions<Contact> = {
      where: { id, deleted: false },
    };

    if (relations && relations.length > 0) {
      findOptions.relations = this.getContactRelations(relations);
    }

    const contact = await this.contactRepository.findOne(findOptions);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  /**
   * Get valid relations for Contact entity
   * Supports nested relations using dot notation (e.g. 'projects.customFields')
   */
  private getContactRelations(relations?: string[]): string[] {
    return [...this.defaultRelations, ...(relations ?? [])];
  }
}
