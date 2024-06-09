import { Module } from '@nestjs/common';
import { TopsisService } from './topsis.service';
import { TopsisController } from './topsis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { SchoolEvent } from 'src/school-events/entities/school-event.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Institution } from 'src/institution/entities/institution.entity';
import { InstitutionService } from 'src/institution/institution.service';
import { AdminUser } from 'src/admin-user/entities/admin-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      StudentPerformance,
      SchoolEvent,
      Competition,
      Complaint, 
      Institution,
      AdminUser
    ]),
  ],
  controllers: [TopsisController],
  providers: [TopsisService, InstitutionService],
})
export class TopsisModule {}
