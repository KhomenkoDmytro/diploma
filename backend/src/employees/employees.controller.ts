import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: CreateEmployeeDto })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateEmployeeDto })
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.employeesService.remove(id);
  }
}
