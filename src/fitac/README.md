# Fitac Module

This module provides CRUD operations for the Fitac entity, which represents records from the `fitac_fitac` database table.

## Overview

The Fitac module follows Clean Architecture principles and includes:
- Entity definition with TypeORM
- Service layer for business logic
- Controller with REST API endpoints
- DTOs for data validation
- Swagger documentation

## Files Structure

```
src/fitac/
├── dto/
│   ├── create-fitac.dto.ts    # DTO for creating Fitac records
│   └── update-fitac.dto.ts    # DTO for updating Fitac records
├── entities/
│   └── fitac.entity.ts        # TypeORM entity definition
├── fitac.controller.ts        # REST API controller
├── fitac.service.ts           # Business logic service
├── fitac.module.ts            # NestJS module configuration
└── README.md                  # This documentation
```

## Entity Properties

The Fitac entity includes the following properties (camelCase in TypeScript, original names in database):

- `id`: Primary key
- `dateEntered`: Creation timestamp
- `dateModified`: Last modification timestamp
- `modifiedUserId`: User who last modified the record
- `createdBy`: User who created the record
- `description`: Record description
- `deleted`: Soft delete flag
- `assignedUserId`: Assigned user ID
- `salutation`: Salutation
- `firstName`: First name
- `lastName`: Last name
- `title`: Title
- `photo`: Photo reference
- `department`: Department
- `doNotCall`: Do not call flag
- Phone fields: `phoneHome`, `phoneMobile`, `phoneWork`, `phoneOther`, `phoneFax`
- `lawfulBasis`: Lawful basis
- `dateReviewed`: Review date
- `lawfulBasisSource`: Lawful basis source
- Address fields: Primary and alternative addresses with street, city, state, postal code, and country
- `assistant`: Assistant name
- `assistantPhone`: Assistant phone
- Document fields: `documentName`, `filename`, `fileExt`, `fileMimeType`
- Date fields: `activeDate`, `expDate`
- Category fields: `categoryId`, `subcategoryId`, `statusId`
- Custom fields: `medPrevMit`, `partiCuidadana`, `cronograma`, `djRniSeia`, `contactIdC`, `proyProyectosteleIdC`, `recursos`, `fotoMontaje`

## API Endpoints

### Base URL: `/fitac`

- `POST /fitac` - Create a new Fitac record
- `GET /fitac` - Get all Fitac records with pagination
- `GET /fitac/search` - Search Fitac records by term
- `GET /fitac/category/:categoryId` - Get records by category
- `GET /fitac/status/:statusId` - Get records by status
- `GET /fitac/assigned/:userId` - Get records by assigned user
- `GET /fitac/:id` - Get a specific Fitac record
- `PATCH /fitac/:id` - Update a Fitac record
- `DELETE /fitac/:id` - Delete a Fitac record

## Usage Example

```typescript
import { FitacService } from './fitac.service';

// Inject the service
constructor(private readonly fitacService: FitacService) {}

// Create a new record
const newFitac = await this.fitacService.create({
  firstName: 'John',
  lastName: 'Doe',
  description: 'Sample record'
});

// Find all records
const allRecords = await this.fitacService.findAll();

// Search records
const searchResults = await this.fitacService.search('John');
```

## Dependencies

- `@nestjs/common`: NestJS core functionality
- `@nestjs/typeorm`: TypeORM integration
- `@nestjs/swagger`: API documentation
- `typeorm`: Database ORM

## Notes

- All database column names are preserved as defined in the original `fitac_fitac` table
- TypeScript properties use camelCase convention
- The module is registered in the main `AppModule`
- Swagger documentation is available for all endpoints
- The service includes additional methods for filtering by category, status, and assigned user