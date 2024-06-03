import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolEvent } from './entities/school-event.entity';
import { CreateSchoolEventDto } from './dto/create-school-event.dto';
import { UpdateSchoolEventDto } from './dto/update-school-event.dto';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class SchoolEventService {
  constructor(
    @InjectRepository(SchoolEvent)
    private readonly schoolEventRepository: Repository<SchoolEvent>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<SchoolEvent[]> {
    return this.schoolEventRepository.find({ relations: ['organizers'] });
  }

  async findOne(id: number): Promise<SchoolEvent> {
    const event = await this.schoolEventRepository.findOne({ where: { id }, relations: ['organizers'] });
    if (!event) {
      throw new NotFoundException(`SchoolEvent with ID ${id} not found`);
    }
    return event;
  }

  async create(createSchoolEventDto: CreateSchoolEventDto): Promise<SchoolEvent> {
    const { organizerIds, ...rest } = createSchoolEventDto;
    const organizers = await this.employeeRepository.findByIds(organizerIds);
    if (organizers.length !== organizerIds.length) {
      throw new NotFoundException(`Some organizers not found`);
    }
    const event = this.schoolEventRepository.create({ ...rest, organizers });
    return this.schoolEventRepository.save(event);
  }

  async update(id: number, updateSchoolEventDto: UpdateSchoolEventDto): Promise<SchoolEvent> {
    const { organizerIds, ...rest } = updateSchoolEventDto;
    const event = await this.schoolEventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`SchoolEvent with ID ${id} not found`);
    }

    if (organizerIds) {
      const organizers = await this.employeeRepository.findByIds(organizerIds);
      if (organizers.length !== organizerIds.length) {
        throw new NotFoundException(`Some organizers not found`);
      }
      event.organizers = organizers;
    }

    Object.assign(event, rest);
    return this.schoolEventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.schoolEventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SchoolEvent with ID ${id} not found`);
    }
  }
}
