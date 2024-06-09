import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { SubjectAssignment } from 'src/subject-assignments/entities/subject-assignment.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import { SchoolEvent } from 'src/school-events/entities/school-event.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { Institution } from 'src/institution/entities/institution.entity';
import { CertificationLetter } from 'src/certification-letters/entities/certification-letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, SubjectAssignment, Competition, SchoolEvent, Complaint, StudentPerformance, Institution, CertificationLetter])],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
