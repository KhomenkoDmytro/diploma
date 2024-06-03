import { Module } from '@nestjs/common';
import { MonthPaymentsService } from './month-payments.service';
import { MonthPaymentsController } from './month-payments.controller';

@Module({
  controllers: [MonthPaymentsController],
  providers: [MonthPaymentsService],
})
export class MonthPaymentsModule {}
