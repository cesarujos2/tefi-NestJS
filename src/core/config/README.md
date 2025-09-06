# Configuration Module

This module contains configuration services that follow the Single Responsibility Principle (SRP) from SOLID principles.

## Files

### `database.config.ts`
- **Responsibility**: Database connection configuration
- **Purpose**: Provides TypeORM configuration for MySQL database
- **Usage**: Used by DatabaseModule to establish database connections

### `swagger.config.ts`
- **Responsibility**: API documentation configuration
- **Purpose**: Sets up Swagger/OpenAPI documentation
- **Features**:
  - API title and description
  - Version management
  - Tags organization
  - Documentation endpoint setup

### `logger.config.ts`
- **Responsibility**: Application logging configuration
- **Purpose**: Centralized logging for application events
- **Features**:
  - Startup logging
  - Error logging
  - Consistent log formatting

## SOLID Principles Applied

- **Single Responsibility Principle (SRP)**: Each configuration class has one reason to change
- **Open/Closed Principle (OCP)**: Configuration can be extended without modifying existing code
- **Dependency Inversion Principle (DIP)**: High-level modules depend on abstractions, not concretions

## Usage Example

```typescript
// In bootstrap service
SwaggerConfig.setup(app);
LoggerConfig.logStartup(port);
```

## Benefits

1. **Maintainability**: Each configuration concern is isolated
2. **Testability**: Individual configurations can be tested in isolation
3. **Reusability**: Configuration services can be reused across different contexts
4. **Scalability**: New configurations can be added without affecting existing ones