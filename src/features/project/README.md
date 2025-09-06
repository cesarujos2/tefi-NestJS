# Proyecto Module

This module handles the management of telecommunications projects (Proyectos) in the TEFI system.

## Overview

The Proyecto module provides comprehensive CRUD operations for managing telecommunications projects, including their relationships with FITAC records and project lifecycle management.

## Features

- **Project Management**: Create, read, update, and delete telecommunications projects
- **Status Tracking**: Monitor project status and progress
- **User Assignment**: Assign projects to specific users
- **Budget Management**: Track project budgets and actual costs
- **Timeline Management**: Manage project start and end dates
- **Progress Tracking**: Monitor project completion percentage
- **Document Management**: Handle project-related documents
- **FITAC Integration**: Many-to-many relationship with FITAC records
- **Pagination Support**: Efficient data retrieval with pagination

## Structure

```
proyecto/
├── dto/
│   ├── create-proyecto.dto.ts    # DTO for creating projects
│   ├── update-proyecto.dto.ts    # DTO for updating projects
│   └── pagination.dto.ts         # Pagination DTOs
├── entities/
│   ├── proyecto.entity.ts        # Main project entity
│   └── proyecto-fitac.entity.ts  # Junction table for project-FITAC relationship
├── proyecto.controller.ts        # REST API endpoints
├── proyecto.service.ts          # Business logic
├── proyecto.module.ts           # Module configuration
└── README.md                    # This file
```

## Entities

### Proyecto Entity

Main entity representing a telecommunications project with the following key properties:

- **Basic Information**: name, description, creation/modification dates
- **Project Details**: status, start/end dates, location, observations
- **Financial**: budget, actual cost, currency
- **Management**: assigned user, responsible person, approved by
- **Progress**: completion percentage, estimated/actual hours
- **Classification**: project type, priority, client
- **Documents**: attached documents

### ProyectoFitac Entity

Junction entity managing the many-to-many relationship between projects and FITAC records.

## API Endpoints

### Projects

- `GET /proyecto` - Get all projects with pagination
- `GET /proyecto/:id` - Get project by ID
- `GET /proyecto/status/:status` - Get projects by status
- `GET /proyecto/user/:userId` - Get projects assigned to user
- `POST /proyecto` - Create new project
- `PATCH /proyecto/:id` - Update project
- `DELETE /proyecto/:id` - Delete project

## DTOs

### CreateProyectoDto

Defines the structure for creating new projects with validation and Swagger documentation.

### UpdateProyectoDto

Extends CreateProyectoDto using PartialType for partial updates.

### PaginationDto

Provides pagination parameters and response structure.

## Services

### ProyectoService

Contains business logic for:

- CRUD operations
- Pagination handling
- Status-based filtering
- User assignment queries
- Relationship management with FITAC

## Usage Examples

### Creating a Project

```typescript
const newProject = {
  name: 'New Telecommunications Tower',
  description: 'Installation of new cellular tower',
  estadoC: 'planning',
  fechaInicioC: '2024-01-15',
  fechaFinC: '2024-06-15',
  presupuestoC: 150000,
  assignedUserId: 'user-uuid'
};

const project = await proyectoService.create(newProject);
```

### Getting Projects with Pagination

```typescript
const paginatedProjects = await proyectoService.findAll({
  page: 1,
  limit: 10,
  sortBy: 'name',
  sortOrder: 'ASC'
});
```

## Database Schema

The module uses the existing `proy_proyectostele` table with custom field mappings to maintain compatibility with the legacy system while providing a clean API interface.

## Relationships

- **Many-to-Many with FITAC**: Projects can be associated with multiple FITAC records through the ProyectoFitac junction table
- **User Assignments**: Projects are assigned to users through foreign key relationships

## Validation

All DTOs include appropriate validation decorators and Swagger documentation for API consistency and documentation generation.

## Error Handling

The service includes proper error handling for:
- Entity not found scenarios
- Database constraint violations
- Invalid input validation

## Future Enhancements

- File upload support for project documents
- Project timeline visualization
- Advanced reporting and analytics
- Integration with external project management tools
- Real-time project status updates