import { AppBootstrapService } from './bootstrap/app-bootstrap.service';

/**
 * Application entry point
 * Delegates bootstrap responsibility to AppBootstrapService following SRP
 */
void AppBootstrapService.bootstrap();
