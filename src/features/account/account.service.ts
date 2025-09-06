import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Account } from './entities/account.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class AccountService {
  private defaultRelations = ['customFields'];

  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Account>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const finalRelations = relations
      ? [...this.defaultRelations, ...relations]
      : this.defaultRelations;

    const [accounts, total] = await this.accountRepository.findAndCount({
      where: { deleted: false },
      relations: finalRelations,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string, relations?: string[]): Promise<Account> {
    const finalRelations = relations
      ? [...this.defaultRelations, ...relations]
      : this.defaultRelations;

    const account = await this.accountRepository.findOne({
      where: { id, deleted: false },
      relations: finalRelations,
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }

  async findByAssignedUser(
    userId: string,
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Account>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const finalRelations = relations
      ? [...this.defaultRelations, ...relations]
      : this.defaultRelations;

    const [accounts, total] = await this.accountRepository.findAndCount({
      where: {
        assignedUserId: userId,
        deleted: false,
      },
      relations: finalRelations,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Account>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const finalRelations = relations
      ? [...this.defaultRelations, ...relations]
      : this.defaultRelations;

    const [accounts, total] = await this.accountRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
        deleted: false,
      },
      relations: finalRelations,
      order: { [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }
}
