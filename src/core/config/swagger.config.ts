import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Swagger configuration service following Single Responsibility Principle
 */
export class SwaggerConfig {
  /**
   * Setup Swagger documentation for the application
   * @param app - NestJS application instance
   */
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('TEFI API')
      .setDescription('API documentation for TEFI application')
      .setVersion('1.0')
      .addTag('database', 'Database operations')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
