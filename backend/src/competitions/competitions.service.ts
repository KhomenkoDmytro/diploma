import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './entities/competition.entity';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Student } from '../students/entities/student.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Employee)
    private readonly teacherRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Competition[]> {
    return this.competitionRepository.find({ relations: ['student', 'teacher'] });
  }

  async findOne(id: number): Promise<Competition> {
    const competition = await this.competitionRepository.findOne({ where: { id }, relations: ['student', 'teacher'] });
    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
    return competition;
  }

  async create(createCompetitionDto: CreateCompetitionDto): Promise<Competition> {
    const { studentId, teacherId, ...dto } = createCompetitionDto;
    const competition = this.competitionRepository.create(dto);

    if (studentId) {
      const student = await this.studentRepository.findOne({where: {id:studentId}});
      if (student) {
        competition.student = student;
      }
    }

    if (teacherId) {
      const teacher = await this.teacherRepository.findOne({where: {id:teacherId}});
      if (teacher) {
        competition.teacher = teacher;
      }
    }

    return this.competitionRepository.save(competition);
  }

  async update(id: number, updateCompetitionDto: UpdateCompetitionDto): Promise<Competition> {
    const { studentId, teacherId, ...dto } = updateCompetitionDto;

    await this.competitionRepository.update(id, dto);
    const updatedCompetition = await this.competitionRepository.findOne({ where: { id }, relations: ['student', 'teacher'] });
    if (!updatedCompetition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }

    if (studentId) {
      const student = await this.studentRepository.findOne({where: {id:studentId}});
      if (student) {
        updatedCompetition.student = student;
      }
    }

    if (teacherId) {
      const teacher = await this.teacherRepository.findOne({where: {id:teacherId}});
      if (teacher) {
        updatedCompetition.teacher = teacher;
      }
    }

    return this.competitionRepository.save(updatedCompetition);
  }

  async remove(id: number): Promise<void> {
    const result = await this.competitionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
  }
}
