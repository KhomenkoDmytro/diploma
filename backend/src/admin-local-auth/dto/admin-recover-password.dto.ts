import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AdminRecoverPasswordDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'newPassword' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[a-zA-Z]/, { message: 'String must contain at least one letter.' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit.' })
  new_password: string;

  @ApiProperty({ default: '111111' })
  @IsString()
  @Length(6, 6, { message: 'OTP must be a string with 6 characters' })
  otp: string;
}
