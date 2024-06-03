import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decree } from './entities/decree.entity';
import { CreateDecreeDto } from './dto/create-decree.dto';
import { UpdateDecreeDto } from './dto/update-decree.dto';

@Injectable()
export class DecreesService {
  constructor(
    @InjectRepository(Decree)
    private readonly decreeRepository: Repository<Decree>,
  ) {}

  async create(createDecreeDto: CreateDecreeDto) {
    const decree = this.decreeRepository.create(createDecreeDto);
    return this.decreeRepository.save(decree);
  }

  async findAll() {
    return this.decreeRepository.find();
  }

  async findOne(id: number) {
    return this.decreeRepository.findOne({where: {id}});
  }

  async update(id: number, updateDecreeDto: UpdateDecreeDto) {
    const decree = await this.decreeRepository.findOne({where: {id}});
    if (!decree) {
      throw new Error('Decree not found');
    }
    return this.decreeRepository.save({ ...decree, ...updateDecreeDto });
  }

  async remove(id: number) {
    await this.decreeRepository.delete(id);
  }
}
