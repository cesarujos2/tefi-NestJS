import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Account } from './entities/account.entity';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of accounts retrieved successfully',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Account>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.accountsService.findAll(paginationDto, relationArray);
  }

  @Get('assigned/:userId')
  @ApiOperation({ summary: 'Get accounts assigned to a user' })
  @ApiParam({ name: 'userId', description: 'Assigned user ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'User accounts list retrieved successfully',
  })
  findByAssignedUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Account>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.accountsService.findByAssignedUser(
      userId,
      paginationDto,
      relationArray,
    );
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Search accounts by name' })
  @ApiParam({ name: 'name', description: 'Account name to search' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Accounts found successfully',
  })
  findByName(
    @Param('name') name: string,
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Account>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.accountsService.findByName(name, paginationDto, relationArray);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by ID' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description:
      'Comma-separated list of relations to include (e.g., customFields,projects)',
  })
  @ApiResponse({
    status: 200,
    description: 'Account retrieved successfully',
    type: Account,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Account> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.accountsService.findOne(id, relationArray);
  }
}
