import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProyectoService } from './proyecto.service';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Proyecto } from './entities/proyecto.entity';

@ApiTags('projects')
@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Proyecto>> {
    return this.proyectoService.findAll(paginationDto);
  }

  @Get('assigned/:userId')
  @ApiOperation({ summary: 'Get projects assigned to a user' })
  @ApiParam({ name: 'userId', description: 'Assigned user ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({
    status: 200,
    description: 'User projects list retrieved successfully',
  })
  findByAssignedUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Proyecto>> {
    return this.proyectoService.findByAssignedUser(userId, paginationDto);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Search projects by name' })
  @ApiParam({ name: 'name', description: 'Project name to search' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({
    status: 200,
    description: 'Projects found successfully',
  })
  findByName(
    @Param('name') name: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Proyecto>> {
    return this.proyectoService.findByName(name.trim(), paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully',
    type: Proyecto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string): Promise<Proyecto> {
    return this.proyectoService.findOne(id);
  }
}
