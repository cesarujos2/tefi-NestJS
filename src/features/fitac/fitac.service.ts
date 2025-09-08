import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fitac } from './entities/fitac.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { TefiService } from '@shared/services/tefi.service';

@Injectable()
export class FitacService {
  constructor(
    @InjectRepository(Fitac)
    private readonly fitacRepository: Repository<Fitac>,
    private readonly tefiService: TefiService,
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

  async findOne(id: string, relations?: string[]): Promise<Fitac> {
    const fitac = await this.fitacRepository.findOne({
      where: { id, deleted: false },
      relations,
    });

    if (!fitac) {
      throw new NotFoundException(`Fitac con ID ${id} no encontrado`);
    }

    return fitac;
  }

  async findByStatus(
    statusId: string,
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
      where: {
        statusId,
        deleted: false,
      },
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

  async findByDocumentName(
    documentName: string,
    relations?: string[],
  ): Promise<Fitac> {
    const fitac = await this.fitacRepository.findOne({
      where: {
        documentName,
        deleted: false,
      },
      relations,
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
      where: {
        assignedUserId,
        deleted: false,
      },
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

  /**
   * Generate PDF for a FITAC record using TEFI service
   * @param fitacId - FITAC record ID
   * @param templateId - PDF template ID
   * @returns Promise<ArrayBuffer> with PDF data
   */
  async generatePdf(fitacId: string, templateId: string): Promise<ArrayBuffer> {
    // Verify that the FITAC record exists
    const fitac = await this.findOne(fitacId);
    if (!fitac) {
      throw new NotFoundException(`FITAC con ID ${fitacId} no encontrado`);
    }

    try {
      // Use TEFI service to generate PDF
      const pdfBuffer = await this.tefiService.generatePdf(
        String(fitacId),
        templateId,
      );

      return pdfBuffer;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(
        `Error generando PDF para FITAC ${fitacId}: ${errorMessage}`,
      );
    }
  }
}
