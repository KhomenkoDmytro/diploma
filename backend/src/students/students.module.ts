import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from 'src/competitions/entities/competition.entity';
import { SubjectAssignment } from 'src/subject-assignments/entities/subject-assignment.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { Institution } from 'src/institution/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Competition, SubjectAssignment, StudentPerformance, Institution])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
