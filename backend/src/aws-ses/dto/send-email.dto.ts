import { IsEmail, IsNumber } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  sourceEmail: string;

  @IsEmail()
  toAddressEmail: string;

  @IsNumber()
  otpCode: string;
}
