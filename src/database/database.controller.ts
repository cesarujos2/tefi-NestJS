import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from './database.service';

@ApiTags('database')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('test-connection')
  @ApiOperation({ summary: 'Probar conexión a la base de datos' })
  @ApiResponse({
    status: 200,
    description: 'Estado de la conexión a la base de datos',
    schema: {
      type: 'object',
      properties: {
        connected: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  async testConnection(): Promise<{ connected: boolean; message: string }> {
    const isConnected = await this.databaseService.testConnection();
    return {
      connected: isConnected,
      message: isConnected
        ? 'Conexión a la base de datos exitosa'
        : 'Error al conectar con la base de datos',
    };
  }
}
