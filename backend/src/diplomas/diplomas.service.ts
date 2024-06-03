import { Injectable } from '@nestjs/common';
import { CreateDiplomaDto } from './dto/create-diploma.dto';
import { UpdateDiplomaDto } from './dto/update-diploma.dto';

@Injectable()
export class DiplomasService {
  create(createDiplomaDto: CreateDiplomaDto) {
    return 'This action adds a new diploma';
  }

  findAll() {
    return `This action returns all diplomas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diploma`;
  }

  update(id: number, updateDiplomaDto: UpdateDiplomaDto) {
    return `This action updates a #${id} diploma`;
  }

  remove(id: number) {
    return `This action removes a #${id} diploma`;
  }
}
