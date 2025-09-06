import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_EXPIRATION = '15m';
  private readonly JWT_REFRESH_EXPIRATION = '7d';
  private readonly BCRYPT_ROUNDS = 12;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session, 'sqlite')
    private readonly sessionRepository: Repository<Session>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticate user with username and password
   */
  async login(
    loginDto: LoginDto,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<AuthResponseDto> {
    const { userName, password } = loginDto;

    // Find user by username
    const user = await this.userRepository.findOne({
      where: { userName, deleted: false },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verify password using the custom hash method
    const isPasswordValid = await this.verifyPassword(password, user.userHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user);

    // Create session
    await this.createSession(
      user.id,
      accessToken,
      refreshToken,
      userAgent,
      ipAddress,
    );

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      status: user.status,
    };

    return new AuthResponseDto({
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 15 * 60, // 15 minutes in seconds
      user: userData,
    });
  }

  /**
   * Logout user and invalidate session
   */
  async logout(
    accessToken: string,
  ): Promise<{ message: string; success: boolean }> {
    try {
      // Find and deactivate session
      const session = await this.sessionRepository.findOne({
        where: { accessToken, isActive: true },
      });

      if (session) {
        session.deactivate();
        await this.sessionRepository.save(session);
      }

      return {
        message: 'Sesión cerrada exitosamente',
        success: true,
      };
    } catch {
      throw new BadRequestException('Error al cerrar sesión');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      // Verify refresh token
      this.jwtService.verify(refreshToken);

      // Find session
      const session = await this.sessionRepository.findOne({
        where: { refreshToken, isActive: true },
      });

      if (!session || session.isRefreshTokenExpired) {
        throw new UnauthorizedException('Token de actualización inválido');
      }

      // Get user from MySQL database
      const user = await this.userRepository.findOne({
        where: { id: session.userId },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Generate new tokens
      const tokens = this.generateTokens(user);

      // Update session
      session.accessToken = tokens.accessToken;
      session.refreshToken = tokens.refreshToken;
      session.accessTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      session.refreshTokenExpiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ); // 7 days
      session.updateActivity();

      await this.sessionRepository.save(session);

      // Prepare user data
      const userData = {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        status: user.status,
      };

      return new AuthResponseDto({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenType: 'Bearer',
        expiresIn: 15 * 60,
        user: userData,
      });
    } catch {
      throw new UnauthorizedException('Token de actualización inválido');
    }
  }

  /**
   * Validate user by ID (used by JWT strategy)
   */
  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId, deleted: false },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Usuario no válido');
    }

    return user;
  }

  /**
   * Verify password using MD5 + bcrypt method
   */
  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      // First, hash the plain password with MD5
      const md5Hash = crypto
        .createHash('md5')
        .update(plainPassword)
        .digest('hex');

      const normalizedHash = hashedPassword.replace(/^\$2y\$/, '$2b$');

      // Then compare with bcrypt
      return await bcrypt.compare(md5Hash, normalizedHash);
    } catch {
      return false;
    }
  }

  /**
   * Generate JWT tokens
   */
  private generateTokens(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = {
      sub: user.id,
      username: user.userName,
      isAdmin: user.isAdmin,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_EXPIRATION,
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: this.JWT_REFRESH_EXPIRATION },
    );

    return { accessToken, refreshToken };
  }

  /**
   * Create new session
   */
  private async createSession(
    userId: string,
    accessToken: string,
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<Session> {
    // Deactivate existing sessions for the user (optional: single session per user)
    await this.sessionRepository.update(
      { userId, isActive: true },
      { isActive: false },
    );

    const session = this.sessionRepository.create({
      userId,
      accessToken,
      refreshToken,
      accessTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      userAgent,
      ipAddress,
      lastActivity: new Date(),
    });

    return await this.sessionRepository.save(session);
  }

  /**
   * Clean expired sessions
   */
  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    await this.sessionRepository
      .createQueryBuilder()
      .delete()
      .where('refreshTokenExpiresAt < :now', { now })
      .execute();
  }
}
