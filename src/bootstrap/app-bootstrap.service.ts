import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { SwaggerConfig } from '../config/swagger.config';
import { LoggerConfig } from '../config/logger.config';

/**
 * Application bootstrap service following Single Responsibility Principle
 */
export class AppBootstrapService {
  private static readonly DEFAULT_PORT = 3000;

  /**
   * Bootstrap the NestJS application
   */
  static async bootstrap(): Promise<void> {
    try {
      const app = await this.createApp();
      this.setupSwagger(app);
      await this.startServer(app);
    } catch (error) {
      this.handleBootstrapError(error as Error);
    }
  }

  /**
   * Create NestJS application instance
   */
  private static async createApp(): Promise<INestApplication> {
    return await NestFactory.create(AppModule);
  }

  /**
   * Setup Swagger documentation
   */
  private static setupSwagger(app: INestApplication): void {
    SwaggerConfig.setup(app);
  }

  /**
   * Start the server and log startup information
   */
  private static async startServer(app: INestApplication): Promise<void> {
    const port = this.getPort();
    await app.listen(port);
    LoggerConfig.logStartup(port);
  }

  /**
   * Get application port from environment or use default
   */
  private static getPort(): number {
    return Number(process.env.PORT) || this.DEFAULT_PORT;
  }

  /**
   * Handle bootstrap errors
   */
  private static handleBootstrapError(error: Error): void {
    LoggerConfig.logStartupError(error);
    process.exit(1);
  }
}
