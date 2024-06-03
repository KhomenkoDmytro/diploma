import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthPaymentsService } from './month-payments.service';
import { CreateMonthPaymentDto } from './dto/create-month-payment.dto';
import { UpdateMonthPaymentDto } from './dto/update-month-payment.dto';

@Controller('month-payments')
export class MonthPaymentsController {
  constructor(private readonly monthPaymentsService: MonthPaymentsService) {}

  @Post()
  create(@Body() createMonthPaymentDto: CreateMonthPaymentDto) {
    return this.monthPaymentsService.create(createMonthPaymentDto);
  }

  @Get()
  findAll() {
    return this.monthPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthPaymentDto: UpdateMonthPaymentDto) {
    return this.monthPaymentsService.update(+id, updateMonthPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthPaymentsService.remove(+id);
  }
}
