import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({where: {id}});
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    await this.subjectRepository.update(id, updateSubjectDto);
    const updatedSubject = await this.subjectRepository.findOne({where: {id}});
    if (!updatedSubject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return updatedSubject;
  }

  async remove(id: number): Promise<void> {
    const result = await this.subjectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
  }
}
