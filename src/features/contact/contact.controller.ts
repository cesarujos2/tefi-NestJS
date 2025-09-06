import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Contact } from './entities/contact.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('contact')
@Controller('contact')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contacts with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of contacts retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Contact>> {
    const relationArray = relations ? relations.split(',') : [];
    return await this.contactService.findAll(paginationDto, relationArray);
  }

  @Get('assigned-user/:userId')
  @ApiOperation({ summary: 'Get contacts by assigned user' })
  @ApiParam({ name: 'userId', type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields)',
  })
  @ApiResponse({
    status: 200,
    description: 'Contacts by assigned user retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  async findByAssignedUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Contact>> {
    const relationArray = relations ? relations.split(',') : [];
    return await this.contactService.findByAssignedUser(
      userId,
      paginationDto,
      relationArray,
    );
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get contacts by name (first or last name)' })
  @ApiParam({ name: 'name', type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields)',
  })
  @ApiResponse({
    status: 200,
    description: 'Contacts by name retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  async findByName(
    @Param('name') name: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Contact>> {
    const relationArray = relations ? relations.split(',') : [];
    return await this.contactService.findByName(
      name,
      paginationDto,
      relationArray,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields)',
  })
  @ApiResponse({
    status: 200,
    description: 'Contact retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Contact not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or expired token',
  })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Contact> {
    const relationArray = relations ? relations.split(',') : [];
    return await this.contactService.findOne(id, relationArray);
  }
}
