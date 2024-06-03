import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

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

  @Get(':id')
  @ApiOperation({ summary: 'Get institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.institutionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution updated successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete institution by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Institution ID' })
  @ApiResponse({ status: 200, description: 'Institution deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Institution not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.institutionService.remove(id);
  }
}
