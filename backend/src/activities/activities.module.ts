import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './entities/activity.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Student } from 'src/students/entities/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Activity, Employee, Student])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService]
})
export class ActivitiesModule {}
