import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (starting from 1)',
    example: 1,
    minimum: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page (maximum 100)',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'dateEntered',
  })
  sortBy?: string = 'dateEntered';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  sortOrder?: 'asc' | 'desc' = 'desc';
}

export class PaginatedResponse<T> {
  @ApiPropertyOptional({
    description: 'Array of items',
  })
  data: T[];

  @ApiPropertyOptional({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiPropertyOptional({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiPropertyOptional({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiPropertyOptional({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNext: boolean;

  @ApiPropertyOptional({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPrev: boolean;
}
