import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Institution } from 'src/institution/entities/institution.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async findAll(): Promise<Complaint[]> {
    return this.complaintRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!complaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
    return complaint;
  }

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const complaint = this.complaintRepository.create(createComplaintDto);

    // Зв'язок з установою
    if (createComplaintDto.institutionId) {
      const institution = await this.institutionRepository.findOne({
        where: { id: createComplaintDto.institutionId },
      });
      if (!institution) {
        throw new NotFoundException(
          `Institution with ID ${createComplaintDto.institutionId} not found`,
        );
      }
      complaint.institution = institution;
    }

    // Зв'язок з працівником
    if (createComplaintDto.employeeId) {
      const employee = await this.employeeRepository.findOne({
        where: { id: createComplaintDto.employeeId },
      });
      if (!employee) {
        throw new NotFoundException(
          `Employee with ID ${createComplaintDto.employeeId} not found`,
        );
      }
      complaint.employee = employee;
    }

    return this.complaintRepository.save(complaint);
  }


  
    async update(
      id: number,
      updateComplaintDto: UpdateComplaintDto,
    ): Promise<Complaint> {
      const existingComplaint = await this.complaintRepository.findOne({ where: { id } });
      if (!existingComplaint) {
        throw new NotFoundException(`Complaint with ID ${id} not found`);
      }
    
      // Оновлюємо скаргу новими даними
      const updatedComplaint = this.complaintRepository.create({
        ...existingComplaint,
        ...updateComplaintDto,
      });
    
      // Оновлюємо зв'язок із установою, якщо передано institutionId
      if (updateComplaintDto.institutionId) {
        const institution = await this.institutionRepository.findOne({
          where: { id: updateComplaintDto.institutionId },
        });
        if (!institution) {
          throw new NotFoundException(
            `Institution with ID ${updateComplaintDto.institutionId} not found`,
          );
        }
        updatedComplaint.institution = institution;
      }
    
      // Оновлюємо зв'язок із працівником, якщо передано employeeId
      if (updateComplaintDto.employeeId) {
        const employee = await this.employeeRepository.findOne({
          where: { id: updateComplaintDto.employeeId },
        });
        if (!employee) {
          throw new NotFoundException(
            `Employee with ID ${updateComplaintDto.employeeId} not found`,
          );
        }
        updatedComplaint.employee = employee;
      }
    
      // Зберігаємо оновлену скаргу із зв'язками
      return this.complaintRepository.save(updatedComplaint);
    }
    


  async remove(id: number): Promise<void> {
    const result = await this.complaintRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
  }
}
