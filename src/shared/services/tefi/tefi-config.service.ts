import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { TefiConfig } from './tefi.types';

/**
 * Service responsible for TEFI configuration management
 * Handles environment variables validation and password hashing
 */
@Injectable()
export class TefiConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Builds and validates TEFI configuration from environment variables
   */
  buildConfig(): TefiConfig {
    const username = this.configService.get<string>('TEFI_USERNAME');
    const password = this.configService.get<string>('TEFI_PASSWORD');
    const url = this.configService.get<string>('TEFI_URL');

    if (!username || !password || !url) {
      throw new Error(
        'Missing TEFI configuration. Check environment variables.',
      );
    }

    return {
      url,
      username,
      password: this.hashPassword(password),
    };
  }

  /**
   * Hashes password using MD5 (required by SuiteCRM)
   */
  private hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
