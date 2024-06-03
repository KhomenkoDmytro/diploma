import { Module } from '@nestjs/common';
import { SchoolEventController } from './school-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEvent } from './entities/school-event.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { SchoolEventService } from './school-events.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEvent, Employee])],
  controllers: [SchoolEventController],
  providers: [SchoolEventService],
})
export class SchoolEventsModule {}
