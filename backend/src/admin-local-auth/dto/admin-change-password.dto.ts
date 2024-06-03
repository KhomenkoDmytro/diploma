import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AdminChangePasswordDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password1' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  old_password: string;

  @ApiProperty({ default: 'newPassword1' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit.' })
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
  new_password: string;
}
