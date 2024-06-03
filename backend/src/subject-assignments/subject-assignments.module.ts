import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectAssignmentsService } from './subject-assignments.service';
import { SubjectAssignmentsController } from './subject-assignments.controller';
import { SubjectAssignment } from './entities/subject-assignment.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectAssignment, Employee, Student, Subject]), EmployeesModule, SubjectsModule, StudentsModule],
  controllers: [SubjectAssignmentsController],
  providers: [SubjectAssignmentsService],
})
export class SubjectAssignmentsModule {}
