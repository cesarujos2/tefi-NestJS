// Types for better type safety
export type SessionToken = string | null;
export type SuiteCrmMethod = 'login' | 'logout';

// Configuration interfaces
export interface TefiConfig {
  readonly url: string;
  readonly username: string;
  readonly password: string;
}

// API request/response interfaces
export interface SuiteCrmRequest {
  readonly method: string;
  readonly input_type: 'JSON';
  readonly response_type: 'JSON';
  readonly rest_data: string;
}

export interface SuiteCrmResponse {
  readonly number?: number;
  readonly name?: string;
}

export interface LoginResponse extends SuiteCrmResponse {
  readonly id?: string;
}

// PDF generation interfaces
export interface PdfGenerationParams {
  readonly fitacId: string;
  readonly templateId: string;
}

export interface CookieMap {
  readonly [key: string]: string;
}

// HTTP client configuration
export interface HttpClientConfig {
  readonly baseURL: string;
  readonly timeout: number;
  readonly headers: Record<string, string>;
}
