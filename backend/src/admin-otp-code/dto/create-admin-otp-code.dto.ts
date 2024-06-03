import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Length,
} from 'class-validator';
import { OtpType } from 'src/helpers/enums/otp-type.enum';

export class CreateAdminOtpCodeDto {
  @ApiProperty({ example: '111111' })
  @IsNumberString()
  @Length(6, 6, { message: 'OTP must be a string with 6 characters' })
  value: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  expiration_minutes: number;

  @ApiProperty({ example: 'verify_account' })
  @IsEnum(OtpType)
  type: OtpType;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
