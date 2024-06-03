import { Module } from '@nestjs/common';
import { StudentPerformancesService } from './student-performances.service';
import { StudentPerformancesController } from './student-performances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentPerformance } from './entities/student-performance.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentPerformance, Student, Employee, Subject])],
  controllers: [StudentPerformancesController],
  providers: [StudentPerformancesService],
})
export class StudentPerformancesModule {}
