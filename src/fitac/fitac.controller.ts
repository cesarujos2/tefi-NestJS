import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FitacService } from './fitac.service';
import { Fitac } from './entities/fitac.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('fitac')
@Controller('fitac')
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
  @ApiResponse({
    status: 200,
    description: 'Fitac records retrieved successfully',
    type: PaginatedResponse<Fitac>,
  })
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Fitac>> {
    return this.fitacService.findAll(paginationDto);
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
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: PaginatedResponse<Fitac>,
  })
  findByStatus(
    @Param('statusId') statusId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Fitac>> {
    return this.fitacService.findByStatus(statusId, paginationDto);
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
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: PaginatedResponse<Fitac>,
  })
  findByAssignedUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Fitac>> {
    return this.fitacService.findByAssignedUser(userId, paginationDto);
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
  @ApiResponse({
    status: 200,
    description: 'Fitac records found',
    type: Fitac,
  })
  findByDocumentName(@Param('documentName') documentName: string) {
    return this.fitacService.findByDocumentName(documentName.trim());
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
  @ApiResponse({
    status: 200,
    description: 'Fitac record found',
    type: Fitac,
  })
  @ApiResponse({
    status: 404,
    description: 'Fitac record not found',
  })
  findOne(@Param('id') id: string): Promise<Fitac> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID debe ser un número válido');
    }
    return this.fitacService.findOne(numericId);
  }
}
