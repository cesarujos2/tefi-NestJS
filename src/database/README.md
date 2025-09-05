# Database Module

Este módulo maneja la conexión a la base de datos MySQL para operaciones de solo lectura (SELECT).

## Configuración

La configuración de la base de datos se encuentra en el archivo `.env` en la raíz del proyecto:

```env
DB_HOST=143.198.103.50
DB_PORT=3306
DB_NAME=dgprc
DB_USER=user_select
DB_PASS=oelsrdmF* (./sdfEE
```

## Estructura

- `database.config.ts`: Configuración de TypeORM para MySQL
- `database.service.ts`: Servicio con métodos para interactuar con la base de datos
- `database.controller.ts`: Controlador REST con endpoints para probar la conexión
- `database.module.ts`: Módulo que exporta el servicio y controlador

## Endpoints Disponibles

### GET /database/test-connection
Prueba la conexión a la base de datos.

**Respuesta:**
```json
{
  "connected": true,
  "message": "Conexión a la base de datos exitosa"
}
```

### GET /database/info
Obtiene información sobre la base de datos conectada.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "version": "8.0.x",
    "database": "dgprc",
    "isConnected": true
  },
  "message": "Información de la base de datos obtenida exitosamente"
}
```

## Servicios Disponibles

### DatabaseService

- `testConnection()`: Prueba la conexión a la base de datos
- `executeQuery(query, parameters?)`: Ejecuta consultas SELECT personalizadas
- `getDatabaseInfo()`: Obtiene información de la base de datos

## Notas Importantes

1. **Solo Lectura**: Esta configuración está optimizada para operaciones SELECT únicamente.
2. **Sincronización Deshabilitada**: `synchronize: false` para evitar cambios en el esquema.
3. **Logging**: Habilitado en modo desarrollo para debugging.
4. **Pool de Conexiones**: Configurado con límite de 10 conexiones simultáneas.

## Uso en Otros Módulos

Para usar el `DatabaseService` en otros módulos:

```typescript
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  // ...
})
export class OtroModule {}
```

Luego inyectar el servicio:

```typescript
import { DatabaseService } from './database/database.service';

@Injectable()
export class OtroService {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async obtenerDatos() {
    return await this.databaseService.executeQuery('SELECT * FROM tabla');
  }
}
```