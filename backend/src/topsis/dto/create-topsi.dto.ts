import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from "class-validator";

export class CreateTopsisDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  institutionId: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-01-01', required: false })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-12-31', required: false })
  endDate?: string;
}
