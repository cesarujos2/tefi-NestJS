import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  BadRequestException,
  UseGuards,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { FitacService } from './fitac.service';
import { Fitac } from './entities/fitac.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('fitac')
@Controller('fitac')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FitacController {
  constructor(private readonly fitacService: FitacService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Fitac records with pagination',
    description: 'Retrieve paginated Fitac records from the database',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starting from 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (max 100)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,proyectos)',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid pagination parameters',
  })
  @ApiResponse({
    status: 200,
    description: 'Fitac records retrieved successfully',
    type: PaginatedResponse<Fitac>,
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Fitac>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.fitacService.findAll(paginationDto, relationArray);
  }

  @Get('status/:statusId')
  @ApiOperation({
    summary: 'Get Fitac records by status with pagination',
    description: 'Retrieve paginated Fitac records filtered by status ID',
  })
  @ApiParam({
    name: 'statusId',
    description: 'Status ID to filter by',
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starting from 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (max 100)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: PaginatedResponse<Fitac>,
  })
  findByStatus(
    @Param('statusId') statusId: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Fitac>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.fitacService.findByStatus(
      statusId,
      paginationDto,
      relationArray,
    );
  }

  @Get('assigned/:userId')
  @ApiOperation({
    summary: 'Get Fitac records by assigned user with pagination',
    description:
      'Retrieve paginated Fitac records filtered by assigned user ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID to filter by',
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starting from 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (max 100)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: PaginatedResponse<Fitac>,
  })
  findByAssignedUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Fitac>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.fitacService.findByAssignedUser(
      userId,
      paginationDto,
      relationArray,
    );
  }

  @Get('/document-name/:documentName')
  @ApiOperation({
    summary: 'Get Fitac records by document name',
    description: 'Retrieve Fitac records that match the provided document name',
  })
  @ApiParam({
    name: 'documentName',
    description: 'Document name to search for',
    type: 'string',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: Fitac,
  })
  findByDocumentName(
    @Param('documentName') documentName: string,
    @Query('relations') relations?: string,
  ) {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.fitacService.findByDocumentName(
      documentName.trim(),
      relationArray,
    );
  }

  @Post(':id/generate-pdf/:templateId')
  @ApiOperation({
    summary: 'Generate PDF for a Fitac record',
    description:
      'Generate a PDF document for a specific Fitac record using a template',
  })
  @ApiParam({
    name: 'id',
    description: 'Fitac record ID',
    type: 'string',
  })
  @ApiParam({
    name: 'templateId',
    description: 'Template ID for PDF generation',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'PDF generated successfully',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Fitac record not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Error generating PDF',
  })
  async generatePdf(
    @Param('id') id: string,
    @Param('templateId') templateId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const pdfBuffer = await this.fitacService.generatePdf(id, templateId);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="fitac-${id}.pdf"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
      });

      res.send(Buffer.from(pdfBuffer));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Error generando PDF: ${errorMessage}`);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Fitac record by ID',
    description: 'Retrieve a specific Fitac record by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Fitac record ID',
    type: 'string',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Fitac record found',
    type: Fitac,
  })
  @ApiResponse({
    status: 404,
    description: 'Fitac record not found',
  })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Fitac> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.fitacService.findOne(id, relationArray);
  }
}
