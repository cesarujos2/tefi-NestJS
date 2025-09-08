import { Injectable, Logger } from '@nestjs/common';
import {
  PdfGenerationParams,
  CookieMap,
  SessionToken,
  TefiConfig,
} from './tefi.types';

/**
 * Service responsible for PDF generation from SuiteCRM
 * Handles PDF requests and session management for PDF generation
 */
@Injectable()
export class TefiPdfGeneratorService {
  private readonly logger = new Logger(TefiPdfGeneratorService.name);

  /**
   * Generates PDF from SuiteCRM
   */
  async generatePdf(
    config: TefiConfig,
    sessionToken: SessionToken,
    params: PdfGenerationParams,
  ): Promise<ArrayBuffer> {
    try {
      this.logger.debug(
        `Generating PDF for FITAC ${params.fitacId} with template ${params.templateId}`,
      );

      const pdfData = await this.requestPdfGeneration(
        config,
        sessionToken,
        params,
      );

      this.logger.debug(
        `PDF generated successfully for FITAC ${params.fitacId}`,
      );
      return pdfData;
    } catch (error) {
      this.handlePdfError(params, error);
    }
  }

  /**
   * Makes the actual PDF generation request
   */
  private async requestPdfGeneration(
    config: TefiConfig,
    sessionToken: SessionToken,
    params: PdfGenerationParams,
  ): Promise<ArrayBuffer> {
    const url = `${config.url}/index.php?entryPoint=generatePdf`;
    const payload = this.buildPdfPayload(params);
    const headers = this.buildPdfHeaders(sessionToken);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle session expiration
    if (this.isSessionExpiredInCookies(response)) {
      throw new Error('Session expired during PDF generation');
    }

    return response.arrayBuffer();
  }

  /**
   * Builds PDF request payload
   */
  private buildPdfPayload(params: PdfGenerationParams): URLSearchParams {
    return new URLSearchParams({
      module: 'Fitac_fitac',
      task: 'pdf',
      templateID: params.templateId,
      uid: params.fitacId,
    });
  }

  /**
   * Builds PDF request headers
   */
  private buildPdfHeaders(sessionToken: SessionToken): Record<string, string> {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `PHPSESSID=${sessionToken}; Path=/;`,
    };
  }

  /**
   * Checks if session expired based on cookies
   */
  private isSessionExpiredInCookies(response: Response): boolean {
    const setCookieHeader = response.headers.get('set-cookie');
    if (!setCookieHeader) return false;

    const cookies = this.parseCookies(setCookieHeader);
    return cookies.loginErrorMessage === 'LBL_SESSION_EXPIRED';
  }

  /**
   * Parses cookie string into object
   */
  private parseCookies(cookieString: string): CookieMap {
    const cookies: Record<string, string> = {};

    cookieString.split('; ').forEach((cookie) => {
      const [key, value] = cookie.split('=');
      if (key && value) {
        cookies[key] = value;
      }
    });

    return cookies;
  }

  /**
   * Handles PDF generation errors
   */
  private handlePdfError(params: PdfGenerationParams, error: unknown): never {
    const message = error instanceof Error ? error.message : 'Unknown error';
    this.logger.error(
      `PDF generation failed for FITAC ${params.fitacId}:`,
      error,
    );
    throw new Error(`Error generando PDF: ${message}`);
  }
}
