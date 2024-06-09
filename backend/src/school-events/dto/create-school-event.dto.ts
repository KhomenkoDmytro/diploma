import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean, IsNumber, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from 'src/enums/event-type.enum';
import { EventScope } from 'src/enums/event-scope.enum';

export class CreateSchoolEventDto {
  @ApiProperty({ example: 'Annual Concert' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'An annual concert featuring student performances.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2024-06-15' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'School Auditorium' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: EventType.CONCERT })
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty({ example: EventScope.SCHOOL })
  @IsNotEmpty()
  @IsEnum(EventScope)
  level: EventScope

  @ApiProperty({ example: [1, 2] })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  organizerIds: number[];

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean = true;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  institutionId:number;
}