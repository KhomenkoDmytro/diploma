import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Institution } from 'src/institution/entities/institution.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);

    if (createStudentDto.institutionId) {
      const institution = await this.institutionRepository.findOne({ where: { id: createStudentDto.institutionId } });
      if (!institution) {
        throw new NotFoundException(`Institution with ID ${createStudentDto.institutionId} not found`);
      }
      student.institution = institution;
    }

    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['competitions', 'institution', 'performances', 'assignments'] });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id }, relations: ['competitions', 'institution', 'performances', 'assignments'] });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    if (updateStudentDto.institutionId) {
      const institution = await this.institutionRepository.findOne({ where: { id: updateStudentDto.institutionId } });
      if (!institution) {
        throw new NotFoundException(`Institution with ID ${updateStudentDto.institutionId} not found`);
      }
      await this.studentRepository.update(id, { ...updateStudentDto, institution });
    } else {
      await this.studentRepository.update(id, updateStudentDto);
    }

    const updatedStudent = await this.studentRepository.findOne({ where: { id }, relations: ['competitions', 'institution', 'performances', 'assignments'] });
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return updatedStudent;
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
