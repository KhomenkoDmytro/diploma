import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthPricesService } from './month-prices.service';
import { CreateMonthPriceDto } from './dto/create-month-price.dto';
import { UpdateMonthPriceDto } from './dto/update-month-price.dto';

@Controller('month-prices')
export class MonthPricesController {
  constructor(private readonly monthPricesService: MonthPricesService) {}

  @Post()
  create(@Body() createMonthPriceDto: CreateMonthPriceDto) {
    return this.monthPricesService.create(createMonthPriceDto);
  }

  @Get()
  findAll() {
    return this.monthPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthPriceDto: UpdateMonthPriceDto) {
    return this.monthPricesService.update(+id, updateMonthPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthPricesService.remove(+id);
  }
}
