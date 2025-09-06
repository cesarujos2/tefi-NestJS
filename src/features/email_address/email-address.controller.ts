import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { EmailAddressService } from './email-address.service';
import { EmailAddress } from './entities/email-address.entity';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';

@ApiTags('email-address')
@Controller('email-address')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EmailAddressController {
  constructor(private readonly emailAddressService: EmailAddressService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all email addresses with pagination',
    description: 'Retrieve paginated email addresses from the database',
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
      'Comma-separated list of relations to include (e.g., contacts)',
  })
  @ApiResponse({
    status: 200,
    description: 'Email addresses retrieved successfully',
    type: PaginatedResponse<EmailAddress>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid pagination parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<EmailAddress>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.emailAddressService.findAll(paginationDto, relationArray);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get email address by ID',
    description: 'Retrieve a specific email address by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Email address ID',
    type: 'string',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., contacts)',
  })
  @ApiResponse({
    status: 200,
    description: 'Email address found',
    type: EmailAddress,
  })
  @ApiResponse({
    status: 404,
    description: 'Email address not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<EmailAddress> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.emailAddressService.findOne(id, relationArray);
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'Get email address by complete email',
    description: 'Search for a specific email address by its complete value',
  })
  @ApiParam({
    name: 'email',
    description: 'Complete email address to search for',
    type: 'string',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Lista separada por comas de relaciones a incluir (ej: contacts)',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección de email encontrada',
    type: EmailAddress,
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección de email no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  findByEmail(
    @Param('email') email: string,
    @Query('relations') relations?: string,
  ): Promise<EmailAddress> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.emailAddressService.findByEmail(email, relationArray);
  }
}
