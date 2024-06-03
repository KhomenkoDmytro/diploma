import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, Employee])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
