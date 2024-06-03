import { Injectable } from '@nestjs/common';
import { CreateMonthPriceDto } from './dto/create-month-price.dto';
import { UpdateMonthPriceDto } from './dto/update-month-price.dto';

@Injectable()
export class MonthPricesService {
  create(createMonthPriceDto: CreateMonthPriceDto) {
    return 'This action adds a new monthPrice';
  }

  findAll() {
    return `This action returns all monthPrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthPrice`;
  }

  update(id: number, updateMonthPriceDto: UpdateMonthPriceDto) {
    return `This action updates a #${id} monthPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthPrice`;
  }
}
