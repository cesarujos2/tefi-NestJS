# Fitac Module

This module provides CRUD operations for the Fitac entity, which represents records from the `fitac_fitac` database table, along with its custom fields from the `fitac_fitac_cstm` table and related projects from the `proy_proyectostele` table.

## Overview

The Fitac module follows Clean Architecture principles and includes:
- Entity definitions with TypeORM (Fitac, FitacCustom, and Proyecto)
- 1:1 relationship between main entity and custom fields
- Many-to-many relationship between Fitac and Proyecto entities
- Service layer for business logic
- Controller with REST API endpoints
- DTOs for data validation
- Swagger documentation

## Files Structure

```
src/fitac/
├── dto/
│   └── pagination.dto.ts      # DTO for pagination and responses
├── entities/
│   ├── fitac.entity.ts        # Main TypeORM entity definition
│   ├── fitac-custom.entity.ts # Custom fields TypeORM entity
│   └── proyecto.entity.ts     # Project TypeORM entity
├── fitac.controller.ts        # REST API controller
├── fitac.service.ts           # Business logic service
├── fitac.module.ts            # NestJS module configuration
└── README.md                  # This documentation
```

## Entity Properties

### Main Fitac Entity (fitac_fitac table)

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

### Custom Fields Entity (fitac_fitac_cstm table)

The FitacCustom entity includes additional custom fields:
- Fitac versions: `fitacV1C` through `fitacV19C`
- Document fields: `parrafoNoConformeC`, `nroOficioRepC`, `fechaOficioC`, `copiasC`
- Time fields: `hrInicialC`, `fechaIngresoC`, `hrAmpliacionC`
- Type fields: `tipoExpedienteC`, `tipoProyectoC`, `estadoAtencionC`
- Link fields: `linkFitacC`, `linkOficioC`, `linkRniC`, `linkSeiaC`
- Report fields: `nroInformeRepC`, `linkInformeRepC`, `fechaInformeRepC`
- Abandonment fields: `informeAbandonoC`, `fechaInformeAbandonoC`, `urlInformeAbandonoC`
- Notification fields: `notificacionC`, `notificacionAbandonoC`
- Account fields: `accountIdC`, `accountId1C`
- Document ID fields: `oficioResolDocIdC`, `informeResolDocIdC`, `fitacDocIdC`
- URL fields: `urlMedidasContingenciaC`, `urlMedidasAmbientalesC`
- Other fields: `numeroSolicitudC`, `ftaV19C`, `fechaAcuseC`

### Project Entity (proy_proyectostele table)

The Proyecto entity includes the following properties:
- `id`: Primary key
- `dateEntered`: Creation timestamp
- `dateModified`: Last modification timestamp
- `modifiedUserId`: User who last modified the record
- `createdBy`: User who created the record
- `description`: Project description
- `deleted`: Soft delete flag
- `assignedUserId`: Assigned user ID
- `name`: Project name
- `status`: Project status
- `projectType`: Type of project
- `startDate`: Project start date
- `endDate`: Project end date
- `budget`: Project budget
- `location`: Project location
- `priority`: Project priority
- `progress`: Project progress percentage
- `notes`: Additional notes

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

// Find all records with custom fields
const allRecords = await this.fitacService.findAll({
  page: 1,
  limit: 10,
  sortBy: 'dateEntered',
  sortOrder: 'desc'
});

// Find one record with custom fields
const record = await this.fitacService.findOne(1);
// Access custom fields: record.customFields.fitacV1C

// Search records (includes custom fields)
const searchResults = await this.fitacService.search('John', {
  page: 1,
  limit: 10
});
```

## Database Relationships

### 1:1 Relationship: Fitac ↔ FitacCustom
- **Primary Key**: `fitac_fitac.id` ↔ `fitac_fitac_cstm.id_c`
- **Foreign Key**: `id_c` in `fitac_fitac_cstm` references `id` in `fitac_fitac`
- **TypeORM**: `@OneToOne` decorator with `@JoinColumn`
- **Loading**: Custom fields are loaded automatically with `relations: ['customFields']`

### Many-to-Many Relationship: Fitac ↔ Proyecto
- **Junction Table**: `fitac_fitac_proy_proyectostele_c`
- **Foreign Keys**: 
  - `fitac_fitac_proy_proyectostelefitac_fitac_idb` references `fitac_fitac.id`
  - `fitac_fitac_proy_proyectosteleproy_proyectostele_ida` references `proy_proyectostele.id`
- **TypeORM**: `@ManyToMany` decorator with `@JoinTable`
- **Loading**: Projects are loaded automatically with `relations: ['proyectos']`
- **SQL Query**: Uses LEFT JOIN through the junction table

## Dependencies

- `@nestjs/common`: NestJS core functionality
- `@nestjs/typeorm`: TypeORM integration
- `@nestjs/swagger`: API documentation
- `typeorm`: Database ORM

## Notes

- All database column names are preserved as defined in the original tables
- TypeScript properties use camelCase convention
- Both entities are registered in the main `AppModule`
- Swagger documentation is available for all endpoints
- The service includes additional methods for filtering by category, status, and assigned user
- Custom fields are automatically included in all API responses
- The relationship ensures data consistency between main and custom tables