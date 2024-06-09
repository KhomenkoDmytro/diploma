import { IsEnum, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Rank } from 'src/enums/teacher-rank.enum';
import { JobTitle } from 'src/enums/job-titlle.enum';
import { Instrument } from 'src/enums/instrument.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificationLetterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  employeeId: number;

  @IsEnum(Rank)
  @ApiProperty({ enum: Rank })
  previousRank: Rank;

  @IsEnum(Rank)
  @ApiProperty({ enum: Rank })
  currentRank: Rank;

  @IsDate()
  @ApiProperty({ example: '2023-01-01' })
  issuanceDate: Date;

  @IsEnum(JobTitle)
  @ApiProperty({ enum: JobTitle })
  jobTitle: JobTitle;

  @IsEnum(Instrument)
  @ApiProperty({ enum: Instrument })
  subject: Instrument;

  @IsString()
  @ApiProperty({ example: 'This is a note.' })
  note: string;
}
