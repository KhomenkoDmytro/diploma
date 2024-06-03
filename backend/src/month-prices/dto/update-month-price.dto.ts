import { PartialType } from '@nestjs/swagger';
import { CreateMonthPriceDto } from './create-month-price.dto';

export class UpdateMonthPriceDto extends PartialType(CreateMonthPriceDto) {}
