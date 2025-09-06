import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sessions')
@Index(['accessToken'])
@Index(['refreshToken'])
@Index(['userId'])
export class Session {
  @ApiProperty({ description: 'Session ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User ID' })
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty({ description: 'Access token' })
  @Column({ name: 'access_token', type: 'text' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  @Column({ name: 'refresh_token', type: 'text' })
  refreshToken: string;

  @ApiProperty({ description: 'Access token expiration date' })
  @Column({ name: 'access_token_expires_at', type: 'datetime' })
  accessTokenExpiresAt: Date;

  @ApiProperty({ description: 'Refresh token expiration date' })
  @Column({ name: 'refresh_token_expires_at', type: 'datetime' })
  refreshTokenExpiresAt: Date;

  @ApiProperty({ description: 'User agent' })
  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string;

  @ApiProperty({ description: 'IP address' })
  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @ApiProperty({ description: 'Is active session' })
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Last activity date' })
  @Column({ name: 'last_activity', type: 'datetime', nullable: true })
  lastActivity: Date;

  @ApiProperty({ description: 'Session created date' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Session updated date' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Note: User relation is handled at service level due to different database connections

  /**
   * Check if access token is expired
   */
  get isAccessTokenExpired(): boolean {
    return new Date() > this.accessTokenExpiresAt;
  }

  /**
   * Check if refresh token is expired
   */
  get isRefreshTokenExpired(): boolean {
    return new Date() > this.refreshTokenExpiresAt;
  }

  /**
   * Check if session is valid
   */
  get isValid(): boolean {
    return this.isActive && !this.isRefreshTokenExpired;
  }

  /**
   * Update last activity
   */
  updateActivity(): void {
    this.lastActivity = new Date();
  }

  /**
   * Deactivate session
   */
  deactivate(): void {
    this.isActive = false;
  }
}
