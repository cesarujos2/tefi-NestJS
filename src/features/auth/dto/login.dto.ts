import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
