import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';

export class CreateStudentDto {
  @ApiProperty({ description: 'First name of the student', default: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the student', default: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Patronymic of the student', required: false, default: 'Smith' })
  @IsOptional()
  @IsString()
  patronymic?: string;

  @ApiProperty({ description: 'Email of the student', required: false, default: 'john.doe@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of the student', default: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Identification number of the student', default: '1234567890' })
  @IsNotEmpty()
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Start date of the student', default: '2024-01-01' })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'End date of the student', required: false, default: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ description: 'Gender of the student', enum: Gender, required: false, default: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ description: 'Residence address of the student', required: false, default: '123 Main St' })
  @IsOptional()
  @IsString()
  residenceAddress?: string;

  @ApiProperty({ description: 'Birth date of the student', default: '2000-01-01' })
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ description: 'Actual address of the student', required: false, default: '456 Secondary St' })
  @IsOptional()
  @IsString()
  actualAddress?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  institutionId: number;
}
