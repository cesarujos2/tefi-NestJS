# Bootstrap Module

This module contains the application bootstrap service that follows SOLID principles, specifically the Single Responsibility Principle (SRP).

## Files

### `app-bootstrap.service.ts`
- **Responsibility**: Application initialization and startup orchestration
- **Purpose**: Coordinates the startup process of the NestJS application
- **Features**:
  - Application instance creation
  - Swagger documentation setup
  - Server startup
  - Error handling during bootstrap
  - Environment configuration

## Architecture Benefits

### Before Refactoring (main.ts)
```typescript
// ❌ Multiple responsibilities in one place
// - Application creation
// - Swagger configuration
// - Server startup
// - Logging
// - Error handling
```

### After Refactoring (SOLID approach)
```typescript
// ✅ Single responsibility: Application entry point
// main.ts -> AppBootstrapService.bootstrap()

// ✅ Delegated responsibilities:
// - SwaggerConfig: API documentation
// - LoggerConfig: Application logging
// - AppBootstrapService: Startup orchestration
```

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- **AppBootstrapService**: Only responsible for application startup orchestration
- **SwaggerConfig**: Only responsible for API documentation setup
- **LoggerConfig**: Only responsible for logging operations

### Open/Closed Principle (OCP)
- New startup steps can be added without modifying existing code
- Configuration services can be extended independently

### Dependency Inversion Principle (DIP)
- Bootstrap service depends on configuration abstractions
- High-level startup logic is separated from low-level configuration details

## Usage

```typescript
// main.ts - Clean and focused
import { AppBootstrapService } from './bootstrap/app-bootstrap.service';

void AppBootstrapService.bootstrap();
```

## Error Handling

The bootstrap service includes comprehensive error handling:
- Catches startup errors
- Logs errors appropriately
- Gracefully exits the process

## Environment Configuration

- Supports `PORT` environment variable
- Falls back to default port (3000)
- Centralized port management