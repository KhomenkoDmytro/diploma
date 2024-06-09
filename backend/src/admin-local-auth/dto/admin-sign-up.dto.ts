import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

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

  @ApiProperty({ default: 'School Name' })
  @IsString()
  schoolName: string;

  @ApiProperty({ default: 'Access Key' })
  @IsString()
  accessKey: string;

  @ApiProperty({ default: 'School Address' })
  @IsString()
  schoolAddress: string;

  @ApiProperty({ default: "Дмитро" })
  @IsString()
  firstName?: string;

  @ApiProperty({ default: "Хоменко" })
  @IsString()
  lastName?: string;

  @ApiProperty({ default: "Ігорович" })
  @IsString()
  patronymic?: string;
}
