import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import { OtpType } from 'src/helpers/enums/otp-type.enum';


export class AdminGenerateOtpDto {
  @ApiProperty({ default: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'verify_account' })
  @IsEnum(OtpType)
  type: OtpType;
}
