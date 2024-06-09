import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CertificationLetter } from 'src/certification-letters/entities/certification-letter.entity';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Get(':id/decrees')
  @ApiOperation({ summary: 'Get decrees' })
  async getDecrees(@Param('id') id: number) {
    return this.institutionService.getDecreesByInstitutionId(id);
  }

  @Get(':id/letters')
  @ApiOperation({ summary: 'Get letters' })
  async getLetters(@Param('id') id: number) {
    return this.institutionService.getLettersByInstitutionId(id);
  }

  @Get(':id/subject-assignments')
  @ApiOperation({ summary: 'Get letters' })
  async getAssignments(@Param('id') id: number) {
    return this.institutionService.getSubjectAssignmentsByInstitutionId(id);
  }

  @Get(':id/competitions')
  @ApiOperation({ summary: 'Get competitions' })
  async getCompetitions(@Param('id') id: number) {
    return this.institutionService.getCompetitionsByInstitutionId(id);
  }
  @Get(':id/complaints')
  @ApiOperation({ summary: 'Get complaints' })
  async getComplaints(@Param('id') id: number) {
    return this.institutionService.getComplaintsByInstitutionId(id);
  }

  @Get(':id/teachers')
  @ApiOperation({ summary: 'Get decrees' })
  async getTeachers(@Param('id') id: number) {
    return this.institutionService.getTeachersByInstitutionId(id);
  }

  @Get(':id/employees')
  @ApiOperation({ summary: 'Get competitions' })
  async getEmployees(@Param('id') id: number) {
    return this.institutionService.getAllEmployeesByInstitutionId(id);
  }
  @Get(':id/students')
  @ApiOperation({ summary: 'Get complaints' })
  async getStudents(@Param('id') id: number) {
    return this.institutionService.getStudentsByInstitutionId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new institution' })
  @ApiResponse({ status: 201, description: 'Institution created successfully.' })
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all institutions' })
  @ApiResponse({ status: 200, description: 'Institutions retrieved successfully.' })
  findAll() {
    return this.institutionService.findAll();
  }

  @Get(':id/certification-letters')
  @ApiOperation({ summary: 'Get all certification letters for an institution' })
  @ApiResponse({ status: 200, description: 'List of all certification letters', type: [CertificationLetter] })
  getCertificationLetters(@Param('id') id: string) {
    return this.institutionService.getCertificationLettersByInstitutionId(+id);
  }

  @Get(':id/student-performances')
  @ApiOperation({ summary: 'Get all student performances for an institution' })
  @ApiResponse({ status: 200, description: 'List of all performances', type: [CertificationLetter] })
  getStudentPerformances(@Param('id') id: string) {
    return this.institutionService.getStudentPerformancesByInstitutionId(+id);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get all student performances for an institution' })
  @ApiResponse({ status: 200, description: 'List of all performances', type: [CertificationLetter] })
  getEvents(@Param('id') id: string) {
    return this.institutionService.getSchoolEventsByInstitutionId(+id);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  findOne(@Param('id') id: number) {
    return this.institutionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution updated successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  update(@Param('id') id: number, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  remove(@Param('id') id: number) {
    return this.institutionService.remove(id);
  }
}
