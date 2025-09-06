# Common Module

This module contains shared components, DTOs, and utilities that are used across multiple modules in the application.

## Structure

- `dto/` - Shared Data Transfer Objects used by multiple modules
  - `pagination.dto.ts` - Common pagination DTOs for API responses

## Purpose

Following Clean Code principles, this module eliminates code duplication by centralizing commonly used components. This ensures:

- **DRY (Don't Repeat Yourself)** - Single source of truth for shared functionality
- **Maintainability** - Changes to shared components only need to be made in one place
- **Consistency** - Ensures uniform behavior across all modules
- **Reusability** - Shared components can be easily imported and used by any module

## Usage

To use shared DTOs in your module:

```typescript
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
```