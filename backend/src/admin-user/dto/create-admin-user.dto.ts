import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  Matches,
  IsNumber,
} from "class-validator";

export class CreateAdminUserDto {
  @ApiProperty({ default: "email@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ default: "Дмитро" })
  @IsString()
  firstName?: string;

  @ApiProperty({ default: "Хоменко" })
  @IsString()
  lastName?: string;

  @ApiProperty({ default: "Ігорович" })
  @IsString()
  patronymic?: string;

  @ApiProperty({ default: "password" })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[a-zA-Z]/, {
    message: "Password must contain at least one letter.",
  })
  @Matches(/[0-9]/, { message: "Password must contain at least one digit." })
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsNumber()
  @ApiProperty({ example: 1 })
  institutionId?: number;
}
