import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fitac } from './entities/fitac.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class FitacService {
  private defaultRelations = ['customFields'];

  constructor(
    @InjectRepository(Fitac)
    private readonly fitacRepository: Repository<Fitac>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Fitac>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const actualLimit = Math.min(limit, 100);
    const skip = (page - 1) * actualLimit;

    const [data, total] = await this.fitacRepository.findAndCount({
      where: { deleted: false },
      relations: [...this.defaultRelations, ...(relations || [])],
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

  async findOne(id: number, relations?: string[]): Promise<Fitac> {
    const fitac = await this.fitacRepository.findOne({
      where: { id, deleted: false },
      relations: [...this.defaultRelations, ...(relations || [])],
    });

    if (!fitac) {
      throw new NotFoundException(`Fitac con ID ${id} no encontrado`);
    }

    return fitac;
  }

  async findByStatus(
    statusId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Fitac>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const actualLimit = Math.min(limit, 100);
    const skip = (page - 1) * actualLimit;

    const [data, total] = await this.fitacRepository.findAndCount({
      where: {
        statusId,
        deleted: false,
      },
      relations: ['customFields'],
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

  async findByDocumentName(documentName: string): Promise<Fitac> {
    const fitac = await this.fitacRepository.findOne({
      where: {
        documentName,
        deleted: false,
      },
      relations: ['customFields'],
    });

    if (!fitac) {
      throw new NotFoundException(
        `Fitac con nombre de documento ${documentName} no encontrado`,
      );
    }
    return fitac;
  }

  async findByAssignedUser(
    assignedUserId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Fitac>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const actualLimit = Math.min(limit, 100);
    const skip = (page - 1) * actualLimit;

    const [data, total] = await this.fitacRepository.findAndCount({
      where: {
        assignedUserId,
        deleted: false,
      },
      relations: ['customFields'],
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
}
