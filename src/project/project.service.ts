import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions } from 'typeorm';
import { Project } from './entities/project.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResponse<Project>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const queryOptions: FindManyOptions<Project> = {
      where: { deleted: 0 },
      relations,
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC',
      },
    };

    const [data, total] =
      await this.projectRepository.findAndCount(queryOptions);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async findOne(id: string, relations?: string[]): Promise<Project> {
    const queryOptions: FindManyOptions<Project> = {
      relations,
      where: { id, deleted: 0 },
    };

    const project = await this.projectRepository.findOne(queryOptions);

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    return project;
  }

  async findByAssignedUser(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Project>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.projectRepository.findAndCount({
      where: { assignedUserId: userId, deleted: 0 },
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Project>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.projectRepository.findAndCount({
      where: {
        deleted: 0,
        documentName: Like(`%${name}%`),
      },
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder.toUpperCase() as 'ASC' | 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrev,
    };
  }
}
