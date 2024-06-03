import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, StudentPerformance])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
