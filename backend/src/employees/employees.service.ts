import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Institution } from 'src/institution/entities/institution.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    if (createEmployeeDto.institutionId) {
      const institution = await this.institutionRepository.findOne({
        where: { id: createEmployeeDto.institutionId },
      });

      if (!institution) {
        throw new NotFoundException(`Institution with ID ${createEmployeeDto.institutionId} not found`);
      }

      employee.institution = institution;
    }
    return await this.employeeRepository.save(employee);
  }

  async findAll(institutionId: number): Promise<Employee[]> {
    return this.employeeRepository.find({ where: { institution: { id: institutionId } }, relations: ['competitions', 'institution'] });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['competitions', 'institution'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['institution', 'competitions'] });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    if (updateEmployeeDto.institutionId) {
      employee.institution = await this.institutionRepository.findOne({ where: { id: updateEmployeeDto.institutionId } });
    }
    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
