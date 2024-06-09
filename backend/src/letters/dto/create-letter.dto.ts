import { IsString, IsNotEmpty, IsDate, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLetterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345' })
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Назва листа' })
  name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ example: '2023-01-01' })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Кому адресований лист' })
  whom: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ example: 'http://example.com/document.pdf' })
  url: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  institutionId: number;
}
