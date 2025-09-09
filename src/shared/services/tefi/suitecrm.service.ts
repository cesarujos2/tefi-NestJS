import { Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  SessionToken,
  SuiteCrmMethod,
  SuiteCrmRequest,
  SuiteCrmResponse,
  LoginResponse,
  TefiConfig,
} from './tefi.types';

/**
 * Service responsible for SuiteCRM authentication
 * Handles login, logout, and session management
 * Each instance maintains its own HTTP client and configuration
 */
export class SuiteCrmService {
  private readonly logger = new Logger(SuiteCrmService.name);
  private sessionToken: SessionToken = null;
  private httpClient: AxiosInstance;
  private config: TefiConfig;

  constructor(config: TefiConfig) {
    this.config = config;
    this.initializeHttpClient();
  }

  /**
   * Initializes the HTTP client with base configuration
   */
  private initializeHttpClient(): void {
    this.httpClient = axios.create({
      baseURL: this.config.url,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Authenticates with SuiteCRM
   */
  async authenticate(forceRefresh = false): Promise<void> {
    if (this.isAuthenticated() && !forceRefresh) {
      return;
    }

    try {
      this.logger.debug('Authenticating with SuiteCRM');

      const loginData = {
        user_auth: {
          user_name: this.config.username,
          password: this.config.password,
        },
        application_name: 'TEFI NestJS Client',
        name_value_list: {},
      };

      const response = await this.makeApiRequest<LoginResponse>(
        'login',
        loginData,
      );

      if (!response.id) {
        throw new Error('No authentication token received');
      }

      this.sessionToken = response.id;
      this.logger.debug('Authentication successful');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Authentication failed:', error);
      throw new Error(`Error de autenticación TEFI: ${message}`);
    }
  }

  /**
   * Logs out from SuiteCRM
   */
  async logout(): Promise<void> {
    if (!this.isAuthenticated()) {
      return;
    }

    try {
      await this.makeApiRequest('logout', {
        session: this.sessionToken,
      });
      this.sessionToken = null;
      this.logger.debug('Logout successful');
    } catch (error) {
      this.logger.error('Logout error:', error);
      // Clear token anyway to prevent stuck state
      this.sessionToken = null;
    }
  }

  /**
   * Makes a generic API request to SuiteCRM
   */
  private async makeApiRequest<T extends SuiteCrmResponse>(
    method: SuiteCrmMethod,
    args: Record<string, unknown>,
  ): Promise<T> {
    const requestData = this.buildRequestData(method, args);

    try {
      this.logger.debug(`SuiteCRM API call: ${method}`);
      const response = await this.httpClient.post(
        '/service/v4_1/rest.php',
        requestData,
      );
      const data = response.data as T;

      if (this.isSessionExpired(data)) {
        throw new Error('Session expired');
      }

      return data;
    } catch (error) {
      this.handleApiError(method, error);
    }
  }

  /**
   * Builds request data for SuiteCRM API
   */
  private buildRequestData(
    method: string,
    args: Record<string, unknown>,
  ): SuiteCrmRequest {
    return {
      method,
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: JSON.stringify(args),
    };
  }

  /**
   * Checks if session is expired based on response
   */
  private isSessionExpired(response: SuiteCrmResponse): boolean {
    return response.number === 11 || response.name === 'Invalid Session ID';
  }

  /**
   * Handles API errors
   */
  private handleApiError(method: string, error: unknown): never {
    const message = error instanceof Error ? error.message : 'Unknown error';
    this.logger.error(`SuiteCRM API error [${method}]:`, error);
    throw new Error(`Error en solicitud a TEFI: ${message}`);
  }

  /**
   * Gets current session token
   */
  getSessionToken(): SessionToken {
    return this.sessionToken;
  }

  /**
   * Checks if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.sessionToken;
  }

  /**
   * Clears session token
   */
  clearSession(): void {
    this.sessionToken = null;
  }
}
