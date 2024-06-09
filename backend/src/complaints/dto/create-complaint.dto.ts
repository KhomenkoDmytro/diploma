import { IsNotEmpty, IsString, IsDateString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventScope } from 'src/enums/event-scope.enum';

export class CreateComplaintDto {
  @ApiProperty({ example: 'Скарга на викладача' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Опис скарги' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2024-06-15' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 'pending' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty({ example: 'https://example.com/document.pdf' })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({ example: 'Іван' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Петренко' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: EventScope.CITY, enum: EventScope })
  @IsNotEmpty()
  @IsEnum(EventScope)
  level: EventScope;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  institutionId?: number;
}
