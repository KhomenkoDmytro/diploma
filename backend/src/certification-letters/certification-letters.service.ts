import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificationLetter } from './entities/certification-letter.entity';
import { CreateCertificationLetterDto } from './dto/create-certification-letter.dto';
import { UpdateCertificationLetterDto } from './dto/update-certification-letter.dto';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class CertificationLetterService {
  constructor(
    @InjectRepository(CertificationLetter)
    private readonly certificationLetterRepository: Repository<CertificationLetter>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createCertificationLetterDto: CreateCertificationLetterDto): Promise<CertificationLetter> {
    const employee = await this.employeeRepository.findOne({where: {id: createCertificationLetterDto.employeeId}});
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const certificationLetter = this.certificationLetterRepository.create({
      ...createCertificationLetterDto,
      employee,
    });
    return this.certificationLetterRepository.save(certificationLetter);
  }

  async findAll(): Promise<CertificationLetter[]> {
    return this.certificationLetterRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<CertificationLetter> {
    const certificationLetter = await this.certificationLetterRepository.findOne({where:{id},  relations: ['employee'] });
    if (!certificationLetter) {
      throw new NotFoundException('Certification Letter not found');
    }
    return certificationLetter;
  }

  async update(id: number, updateCertificationLetterDto: UpdateCertificationLetterDto): Promise<CertificationLetter> {
    const certificationLetter = await this.findOne(id);
    const employee = updateCertificationLetterDto.employeeId
      ? await this.employeeRepository.findOne({where: {id: updateCertificationLetterDto.employeeId}})
      : certificationLetter.employee;

    if (updateCertificationLetterDto.employeeId && !employee) {
      throw new NotFoundException('Employee not found');
    }

    Object.assign(certificationLetter, { ...updateCertificationLetterDto, employee });
    return this.certificationLetterRepository.save(certificationLetter);
  }

  async remove(id: number): Promise<void> {
    const certificationLetter = await this.findOne(id);
    await this.certificationLetterRepository.remove(certificationLetter);
  }
}
