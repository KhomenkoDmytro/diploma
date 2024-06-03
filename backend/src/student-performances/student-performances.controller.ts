import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { StudentPerformancesService } from './student-performances.service';
import { CreateStudentPerformanceDto } from './dto/create-student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('student-performances')
@Controller('student-performances')
export class StudentPerformancesController {
  constructor(private readonly studentPerformanceService: StudentPerformancesService) {}

  @Get()
  async findAll() {
    return this.studentPerformanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.studentPerformanceService.findOne(id);
  }

  @Post()
  async create(@Body() createStudentPerformanceDto: CreateStudentPerformanceDto) {
    return this.studentPerformanceService.create(createStudentPerformanceDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateStudentPerformanceDto: UpdateStudentPerformanceDto) {
    return this.studentPerformanceService.update(id, updateStudentPerformanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.studentPerformanceService.remove(id);
  }
}
