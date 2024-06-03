import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { EmploymentType, Position } from "../entities/employee.entity";
import { Gender } from "src/enums/gender.enum";

export class CreateEmployeeDto {
  @ApiProperty({ description: "First name of the employee", default: "John" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: "Last name of the employee", default: "Doe" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Patronymic of the employee",
    required: false,
    default: "Smith",
  })
  @IsOptional()
  @IsString()
  patronymic?: string;

  @ApiProperty({
    description: "Email of the employee",
    required: false,
    default: "john.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Phone number of the employee",
    default: "+1234567890",
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: "Employment type of the employee",
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  @IsNotEmpty()
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({
    description: "Identification number of the employee",
    default: "123456789",
  })
  @IsNotEmpty()
  @IsString()
  identificationNumber: string;

  @ApiProperty({
    description: "Start date of the employee",
    default: new Date().toISOString(),
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: "End date of the employee",
    required: false,
    default: null,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({
    description: "Gender of the employee",
    enum: Gender,
    required: false,
    default: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: "Position of the employee",
    enum: Position,
    default: Position.TEACHER,
  })
  @IsNotEmpty()
  @IsEnum(Position)
  position: Position;

  @ApiProperty({
    description: "Residence address of the employee",
    required: false,
    default: "123 Main St, City",
  })
  @IsOptional()
  @IsString()
  residenceAddress?: string;

  @ApiProperty({
    description: "Birth date of the employee",
    default: new Date("1990-01-01").toISOString(),
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    description: "Actual address of the employee",
    required: false,
    default: "456 Elm St, Town",
  })
  @IsOptional()
  @IsString()
  actualAddress?: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  institutionId?: number;
}
