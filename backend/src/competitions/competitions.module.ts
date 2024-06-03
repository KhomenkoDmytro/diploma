import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { Student } from 'src/students/entities/student.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Employee, Student])],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
