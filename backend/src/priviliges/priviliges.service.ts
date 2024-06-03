import { Injectable } from '@nestjs/common';
import { CreatePriviligeDto } from './dto/create-privilige.dto';
import { UpdatePriviligeDto } from './dto/update-privilige.dto';

@Injectable()
export class PriviligesService {
  create(createPriviligeDto: CreatePriviligeDto) {
    return 'This action adds a new privilige';
  }

  findAll() {
    return `This action returns all priviliges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privilige`;
  }

  update(id: number, updatePriviligeDto: UpdatePriviligeDto) {
    return `This action updates a #${id} privilige`;
  }

  remove(id: number) {
    return `This action removes a #${id} privilige`;
  }
}
