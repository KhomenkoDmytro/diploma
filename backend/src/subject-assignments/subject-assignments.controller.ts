import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SubjectAssignmentsService } from './subject-assignments.service';
import { CreateSubjectAssignmentDto } from './dto/create-subject-assignment.dto';
import { UpdateSubjectAssignmentDto } from './dto/update-subject-assignment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subject-assignments')
@Controller('subject-assignments')
export class SubjectAssignmentsController {
  constructor(private readonly subjectAssignmentsService: SubjectAssignmentsService) {}

  @Post()
  create(@Body() createSubjectAssignmentDto: CreateSubjectAssignmentDto) {
    return this.subjectAssignmentsService.create(createSubjectAssignmentDto);
  }

  @Get()
  findAll() {
    return this.subjectAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectAssignmentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectAssignmentDto: UpdateSubjectAssignmentDto) {
    return this.subjectAssignmentsService.update(+id, updateSubjectAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectAssignmentsService.remove(+id);
  }
}
