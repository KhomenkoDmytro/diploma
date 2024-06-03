import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '../entities/activity.entity';

export class CreateActivityDto {
  @ApiProperty({
    enum: ActivityType,
    description: 'The type of the activity',
    example: ActivityType.STUDENT_COMPETITION
  })
  @IsEnum(ActivityType)
  @IsNotEmpty()
  type: ActivityType;

  @ApiProperty({
    description: 'Description of the activity',
    example: 'Students perform in a state music competition.'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Date of the activity',
    example: '2024-05-24',
    type: 'string',
    format: 'date'
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'ID of the teacher involved in the activity, if any',
    example: 1,
    required: false
  })
  @IsOptional()
  teacherId?: number;

  @ApiProperty({
    description: 'ID of the student involved in the activity, if any',
    example: 2,
    required: false
  })
  @IsOptional()
  studentId?: number;

  @ApiProperty({
    description: 'Details about any awards related to the activity',
    example: 'Best Performance Award in Regional Competition',
    required: false
  })
  @IsOptional()
  @IsString()
  awardDetails?: string;
}
