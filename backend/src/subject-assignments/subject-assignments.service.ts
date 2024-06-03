import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectAssignment } from './entities/subject-assignment.entity';
import { CreateSubjectAssignmentDto } from './dto/create-subject-assignment.dto';
import { UpdateSubjectAssignmentDto } from './dto/update-subject-assignment.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Injectable()
export class SubjectAssignmentsService {
  constructor(
    @InjectRepository(SubjectAssignment)
    private readonly subjectAssignmentRepository: Repository<SubjectAssignment>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectAssignmentDto: CreateSubjectAssignmentDto): Promise<SubjectAssignment> {
    const { subjectId, studentId, teacherId, status } = createSubjectAssignmentDto;

    const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const teacher = await this.employeeRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const subjectAssignment = this.subjectAssignmentRepository.create({
      subject,
      student,
      teacher,
      status,
    });

    return this.subjectAssignmentRepository.save(subjectAssignment);
  }

  async findAll(): Promise<SubjectAssignment[]> {
    return this.subjectAssignmentRepository.find({ relations: ['subject', 'student', 'teacher'] });
  }

  async findOne(id: number): Promise<SubjectAssignment> {
    const subjectAssignment = await this.subjectAssignmentRepository.findOne({ where: { id }, relations: ['subject', 'student', 'teacher'] });
    if (!subjectAssignment) {
      throw new NotFoundException(`SubjectAssignment with ID ${id} not found`);
    }
    return subjectAssignment;
  }

  async update(id: number, updateSubjectAssignmentDto: UpdateSubjectAssignmentDto): Promise<SubjectAssignment> {
    const subjectAssignment = await this.findOne(id);

    const { subjectId, studentId, teacherId, status } = updateSubjectAssignmentDto;

    if (subjectId) {
      const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${subjectId} not found`);
      }
      subjectAssignment.subject = subject;
    }

    if (studentId) {
      const student = await this.studentRepository.findOne({ where: { id: studentId } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }
      subjectAssignment.student = student;
    }

    if (teacherId) {
      const teacher = await this.employeeRepository.findOne({ where: { id: teacherId } });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }
      subjectAssignment.teacher = teacher;
    }

    if (status !== undefined) {
      subjectAssignment.status = status;
    }

    return this.subjectAssignmentRepository.save(subjectAssignment);
  }

  async remove(id: number): Promise<void> {
    const subjectAssignment = await this.findOne(id);
    await this.subjectAssignmentRepository.remove(subjectAssignment);
  }
}
