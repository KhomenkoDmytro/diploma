import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AdminChangeEmailDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'newEmail@gmail.com' })
  @IsEmail()
  new_email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[a-zA-Z]/, { message: 'String must contain at least one letter.' })
  password: string;
}
