import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
