import { IsNotEmpty, IsNumber, IsDateString, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventScope } from 'src/enums/event-scope.enum';

export class CreateStudentPerformanceDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @ApiProperty({ example: 'Excellent performance in subject X' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '2024-06-15' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: EventScope.SCHOOL })
  @IsNotEmpty()
  @IsEnum(EventScope)
  level: EventScope

}
