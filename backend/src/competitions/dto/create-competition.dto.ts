import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CompetitionResult } from 'src/enums/competition-result.enum';
import { CompetitionType } from 'src/enums/competition-type.enum';
import { EventScope } from 'src/enums/event-scope.enum';

export class CreateCompetitionDto {
  @ApiProperty({ example: 'Назва конкурсу' }) // Додайте приклад для title
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Опис конкурсу' }) // Додайте приклад для description
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2024-01-01' }) // Додайте приклад для date
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ enum: EventScope, default: EventScope.CITY }) // Додайте значення за замовчуванням для level
  @IsEnum(EventScope)
  @IsNotEmpty()
  level: EventScope;

  @ApiProperty({ enum: CompetitionResult, default: CompetitionResult.GRAND_PRIX }) // Додайте значення за замовчуванням для result
  @IsEnum(CompetitionResult)
  @IsNotEmpty()
  result: CompetitionResult;

  @ApiProperty({ enum: CompetitionType, default:CompetitionType.PROFESSIONAL }) // Додайте значення за замовчуванням для competitionType
  @IsEnum(CompetitionType)
  @IsNotEmpty()
  competitionType: CompetitionType;

  @ApiProperty({ example: 1 }) // Додайте приклад для studentId
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 1 }) // Додайте приклад для teacherId
  @IsNotEmpty()
  teacherId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  institutionId?: number;
}
