import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/helpers/enums/role.enum';

export class AdminSignUpDto {

  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password1' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit.' })
  password: string;
}
