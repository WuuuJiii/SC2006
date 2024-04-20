import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for user login
 * Used for validating and transferring login information
 */
export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}