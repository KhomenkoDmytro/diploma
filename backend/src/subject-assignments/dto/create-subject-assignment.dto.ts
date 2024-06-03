import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsNotEmpty } from 'class-validator';
import { AssignmentStatus } from 'src/enums/assignment-status.enum';

export class CreateSubjectAssignmentDto {
  @ApiProperty({ description: 'Subject ID' })
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ description: 'Student ID' })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ description: 'Teacher ID' })
  @IsInt()
  @IsNotEmpty()
  teacherId: number;


  @ApiProperty({ description: 'Status', enum: AssignmentStatus })
  @IsEnum(AssignmentStatus)
  @IsNotEmpty()
  status: AssignmentStatus;
}
