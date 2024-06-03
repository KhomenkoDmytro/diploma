import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AdminVerifyEmailDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '111111' })
  @IsString()
  @Length(6, 6, { message: 'OTP must be a string with 6 characters' })
  otp: string;
}
