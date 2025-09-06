# Project Entities

This directory contains the entity definitions for the Project module.

## Entities

### Project (`project.entity.ts`)
Main entity representing a project in the system. Contains all the core project information including:
- Basic project details (name, description, dates)
- Location information (coordinates, address)
- Technical specifications (budget, useful life, infrastructure type)
- Relationships with Fitac entities
- One-to-one relationship with ProjectCustom for extended fields

### ProjectCustom (`project-custom.entity.ts`)
Extended entity for project custom fields, mapped to the `proy_proyectostele_cstm` table. Contains specialized fields for:

#### Technical Specifications
- `tipoMimetizacionC`: Type of camouflage/mimicry
- `seiaNoSeiaC`: SEIA/No SEIA classification
- `zonificacionDesplegableC`: Deployable zoning
- `heC`: HE value
- `hsC`: HS value
- `cantPostesC`: Number of posts
- `longAereoC`: Aerial length
- `longSubterraneoC`: Underground length
- `canalizadoNuevoC`: New channeling
- `anpZaC`: ANP/ZA classification
- `numAntenasC`: Number of antennas
- `numNodosC`: Number of nodes

#### Project Details
- `proyServicioC`: Project service
- `objetiveC`: Objective
- `radiodifusionC`: Broadcasting
- `medidasContingenciaC`: Contingency measures
- `medidasSocioambientalesC`: Socio-environmental measures

#### Timeline
- `construccionFechasC`: Construction dates
- `operacionFechasC`: Operation dates
- `cierreFechasC`: Closure dates

#### Links and Documentation
- `linkOtraMimetizacionC`: Link to other camouflage
- `urlKmzC`: KMZ URL
- `actividadExcluidaC`: Excluded activity
- `urlExclusionC`: Exclusion URL

## Relationships

- **Project ↔ ProjectCustom**: One-to-one relationship where each project can have extended custom fields
- **Project ↔ Fitac**: Many-to-many relationship through junction table `fitac_fitac_proy_proyectostele_c`

## Usage

The ProjectCustom entity is automatically loaded when using the `customFields` relation in queries:

```typescript
// Load project with custom fields
const project = await projectService.findOne(id, ['customFields']);

// Access custom fields
const tipoMimetizacion = project.customFields?.tipoMimetizacionC;
```

## Database Mapping

- **Project**: Maps to `proy_proyectostele` table
- **ProjectCustom**: Maps to `proy_proyectostele_cstm` table
- **Junction**: Uses `fitac_fitac_proy_proyectostele_c` for Project-Fitac relationships