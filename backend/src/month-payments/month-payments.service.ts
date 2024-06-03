import { Injectable } from '@nestjs/common';
import { CreateMonthPaymentDto } from './dto/create-month-payment.dto';
import { UpdateMonthPaymentDto } from './dto/update-month-payment.dto';

@Injectable()
export class MonthPaymentsService {
  create(createMonthPaymentDto: CreateMonthPaymentDto) {
    return 'This action adds a new monthPayment';
  }

  findAll() {
    return `This action returns all monthPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthPayment`;
  }

  update(id: number, updateMonthPaymentDto: UpdateMonthPaymentDto) {
    return `This action updates a #${id} monthPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthPayment`;
  }
}
