import { Module } from '@nestjs/common';
import { TopsisService } from './topsis.service';
import { TopsisController } from './topsis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { SchoolEvent } from 'src/school-events/entities/school-event.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      StudentPerformance,
      SchoolEvent,
      Competition,
      Complaint
    ]),
  ],
  controllers: [TopsisController],
  providers: [TopsisService],
})
export class TopsisModule {}
