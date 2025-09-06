import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export interface DatabaseInfo {
  version: string;
  database: string;
  isConnected: boolean;
}

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
  ) {}

  /**
   * Test database connection
   * @returns Promise<boolean> - Connection status
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.connection.query('SELECT 1');
      this.logger.log('Database connection successful');
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Database connection failed:', errorMessage);
      return false;
    }
  }

  /**
   * Execute a raw SELECT query
   * @param query - SQL query string
   * @param parameters - Query parameters
   * @returns Promise<unknown[]> - Query results
   */
  async executeQuery(
    query: string,
    parameters?: unknown[],
  ): Promise<unknown[]> {
    try {
      const result: unknown[] = await this.connection.query(query, parameters);
      this.logger.log(`Query executed successfully: ${query}`);
      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Query execution failed: ${query}`, errorMessage);
      throw error;
    }
  }
}
