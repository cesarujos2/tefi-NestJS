import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { PaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Project } from './entities/project.entity';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description: 'Comma-separated list of relations to include (e.g., fitacs)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('relations') relations?: string,
  ): Promise<PaginatedResponse<Project>> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.projectService.findAll(paginationDto, relationArray);
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
  ): Promise<PaginatedResponse<Project>> {
    return this.projectService.findByAssignedUser(userId, paginationDto);
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
  ): Promise<PaginatedResponse<Project>> {
    return this.projectService.findByName(name, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: String,
    description: 'Comma-separated list of relations to include (e.g., fitacs)',
  })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Project> {
    const relationArray = relations
      ? relations.split(',').map((r) => r.trim())
      : undefined;
    return this.projectService.findOne(id, relationArray);
  }
}
