import { PartialType } from '@nestjs/swagger';
import { CreateStudentPerformanceDto } from './create-student-performance.dto';

export class UpdateStudentPerformanceDto extends PartialType(CreateStudentPerformanceDto) {}
