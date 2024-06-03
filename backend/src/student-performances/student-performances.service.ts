import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentPerformance } from './entities/student-performance.entity';
import { CreateStudentPerformanceDto } from './dto/create-student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class StudentPerformancesService {
  constructor(
    @InjectRepository(StudentPerformance)
    private readonly studentPerformanceRepository: Repository<StudentPerformance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<StudentPerformance[]> {
    return this.studentPerformanceRepository.find({ relations: ['student', 'subject', 'teacher'] });
  }

  async findOne(id: number): Promise<StudentPerformance> {
    const performance = await this.studentPerformanceRepository.findOne({ where: { id }, relations: ['student', 'subject', 'teacher'] });
    if (!performance) {
      throw new NotFoundException(`StudentPerformance with ID ${id} not found`);
    }
    return performance;
  }
  async create(createStudentPerformanceDto: CreateStudentPerformanceDto): Promise<StudentPerformance> {
    const { studentId, subjectId, teacherId, description, date } = createStudentPerformanceDto;

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
    const teacher = await this.employeeRepository.findOne({ where: { id: teacherId } });

    if (!student || !subject || !teacher) {
      throw new NotFoundException(`Related entities not found`);
    }

    const performance = this.studentPerformanceRepository.create({
      student,
      subject,
      teacher,
      description,
      date,
    });

    return this.studentPerformanceRepository.save(performance);
  }

  async update(id: number, updateStudentPerformanceDto: UpdateStudentPerformanceDto): Promise<StudentPerformance> {
    const { studentId, subjectId, teacherId, description, date } = updateStudentPerformanceDto;

    const performance = await this.studentPerformanceRepository.findOne({ where: { id }, relations: ['student', 'subject', 'teacher'] });
    if (!performance) {
      throw new NotFoundException(`StudentPerformance with ID ${id} not found`);
    }

    if (studentId) {
      const student = await this.studentRepository.findOne({ where: { id: studentId } });
      if (!student) throw new NotFoundException(`Student with ID ${studentId} not found`);
      performance.student = student;
    }

    if (subjectId) {
      const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
      if (!subject) throw new NotFoundException(`Subject with ID ${subjectId} not found`);
      performance.subject = subject;
    }

    if (teacherId) {
      const teacher = await this.employeeRepository.findOne({ where: { id: teacherId } });
      if (!teacher) throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      performance.teacher = teacher;
    }

    if (description) performance.description = description;
    if (date) performance.date = date;

    return this.studentPerformanceRepository.save(performance);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentPerformanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StudentPerformance with ID ${id} not found`);
    }
  }
}