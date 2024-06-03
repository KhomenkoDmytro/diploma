import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { SubjectType } from 'src/enums/subject-type.enum';

export class CreateSubjectDto {
  @ApiProperty({ example: 'бандура' })
  @IsString()
  name: string;

  @ApiProperty({ enum: SubjectType, example: SubjectType.MAJOR })
  @IsEnum(SubjectType)
  type: SubjectType;
}
