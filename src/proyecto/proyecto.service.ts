import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Proyecto>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.proyectoRepository.findAndCount({
      where: { deleted: 0 },
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

  async findOne(id: string): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id, deleted: 0 },
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    return proyecto;
  }

  async findByAssignedUser(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Proyecto>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.proyectoRepository.findAndCount({
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
  ): Promise<PaginatedResponse<Proyecto>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dateEntered',
      sortOrder = 'desc',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.proyectoRepository.findAndCount({
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
