import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsUrl, IsEnum } from 'class-validator';
import { DecreeType } from '../entities/decree.entity';

export class CreateDecreeDto {
  @ApiProperty({ description: 'The number of the decree', default: '1' })
  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @ApiProperty({ description: 'The type of the decree', enum: DecreeType, default: DecreeType.GENERAL })
  @IsNotEmpty()
  @IsEnum(DecreeType)
  readonly type: DecreeType;

  @ApiProperty({ description: 'The name of the decree', default: 'Про встановлення надбавки' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The date of the decree', default: '2024-01-01' })
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;


  @ApiProperty({ description: 'The URL of the decree', default: 'https://docs.google.com/document/d/18S0ZFFRIO2VUiSXb-rurbKHXI4cJmbp2/edit' })
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
