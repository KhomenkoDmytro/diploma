import { PartialType } from '@nestjs/swagger';
import { CreateAdminOtpCodeDto } from './create-admin-otp-code.dto';
import { IsEnum } from 'class-validator';
import { OtpStatus } from 'src/helpers/enums/otp-status.enum';

export class UpdateAdminOtpCodeDto extends PartialType(CreateAdminOtpCodeDto) {
  @IsEnum(OtpStatus)
  status: OtpStatus;
}
