import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CompetitionResult } from "src/enums/competition-result.enum";
import { CompetitionType } from "src/enums/competition-type.enum";
import { EventScope } from "src/enums/event-scope.enum";

export class CreateCompetitionDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsDate()
    @IsNotEmpty()
    date: Date;
  
    @IsEnum(EventScope)
    @IsNotEmpty()
    level: EventScope;
  
    @IsEnum(CompetitionResult)
    @IsNotEmpty()
    result: CompetitionResult;
  
    @IsEnum(CompetitionType)
    @IsNotEmpty()
    competitionType: CompetitionType;
  
    @IsNotEmpty()
    studentId: number;
  
    @IsNotEmpty()
    teacherId: number;
  }
  