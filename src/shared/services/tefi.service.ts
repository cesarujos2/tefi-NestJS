import { Injectable, Logger } from '@nestjs/common';
import { TefiConfigService } from './tefi/tefi-config.service';
import { SuiteCrmService } from './tefi/suitecrm.service';
import { TefiPdfGeneratorService } from './tefi/tefi-pdf-generator.service';
import {
  SessionToken,
  TefiConfig,
  PdfGenerationParams,
} from './tefi/tefi.types';

/**
 * Main service for SuiteCRM (TEFI) integration
 * Orchestrates authentication and PDF generation using specialized services
 */
@Injectable()
export class TefiService {
  private readonly logger = new Logger(TefiService.name);
  private readonly config: TefiConfig;
  private readonly suiteCrmService: SuiteCrmService;

  constructor(
    private readonly tefiConfigService: TefiConfigService,
    private readonly TefiPdfGeneratorService: TefiPdfGeneratorService,
  ) {
    this.config = this.tefiConfigService.buildConfig();
    this.suiteCrmService = new SuiteCrmService(this.config);
  }

  /**
   * Generates PDF for a FITAC using the specified template
   */
  public async generatePdf(
    fitacId: string,
    templateId: string,
  ): Promise<ArrayBuffer> {
    const params: PdfGenerationParams = { fitacId, templateId };

    try {
      // Ensure authentication
      await this.suiteCrmService.authenticate();

      // Generate PDF using specialized service
      return await this.TefiPdfGeneratorService.generatePdf(
        this.config,
        this.suiteCrmService.getSessionToken(),
        params,
      );
    } catch (error) {
      // If session expired, retry once
      if (error instanceof Error && error.message.includes('Session expired')) {
        this.logger.warn('Session expired, retrying PDF generation...');
        this.suiteCrmService.clearSession();

        return await this.generatePdf(fitacId, templateId);
      }
      throw error;
    }
  }

  /**
   * Gets current session token
   */
  public getSessionToken(): SessionToken {
    return this.suiteCrmService.getSessionToken();
  }

  /**
   * Checks if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.suiteCrmService.isAuthenticated();
  }

  /**
   * Logs out from SuiteCRM
   */
  public async logout(): Promise<void> {
    await this.suiteCrmService.logout();
  }
}
