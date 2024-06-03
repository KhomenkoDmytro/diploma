import { Module } from '@nestjs/common';
import { MonthPricesService } from './month-prices.service';
import { MonthPricesController } from './month-prices.controller';

@Module({
  controllers: [MonthPricesController],
  providers: [MonthPricesService],
})
export class MonthPricesModule {}
