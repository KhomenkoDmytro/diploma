import { PartialType } from '@nestjs/swagger';
import { CreateMonthPaymentDto } from './create-month-payment.dto';

export class UpdateMonthPaymentDto extends PartialType(CreateMonthPaymentDto) {}
