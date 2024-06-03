import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { AdminUser } from 'src/admin-user/entities/admin-user.entity';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
    const institution = this.institutionRepository.create(createInstitutionDto);

    if (createInstitutionDto.adminUserId) {
      const adminUser = await this.adminUserRepository.findOne({ where: { id: createInstitutionDto.adminUserId } });
      if (!adminUser) {
        throw new NotFoundException(`AdminUser with ID ${createInstitutionDto.adminUserId} not found`);
      }
      institution.adminUsers = [adminUser];
    }

    return this.institutionRepository.save(institution);
  }

  async findAll(): Promise<Institution[]> {
    return this.institutionRepository.find({ relations: ['adminUsers', 'employees', 'students'] });
  }

  async findOne(id: number): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({ where: { id }, relations: ['adminUsers', 'employees', 'students'] });
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return institution;
  }

  async update(id: number, updateInstitutionDto: UpdateInstitutionDto): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({ where: { id } });

    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }

    if (updateInstitutionDto.adminUserId) {
      const adminUser = await this.adminUserRepository.findOne({ where: { id: updateInstitutionDto.adminUserId } });
      if (!adminUser) {
        throw new NotFoundException(`AdminUser with ID ${updateInstitutionDto.adminUserId} not found`);
      }
      institution.adminUsers = [adminUser];
    }

    await this.institutionRepository.update(id, updateInstitutionDto);

    const updatedInstitution = await this.institutionRepository.findOne({ where: { id }, relations: ['adminUsers', 'employees', 'students'] });
    if (!updatedInstitution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return updatedInstitution;
  }

  async remove(id: number): Promise<void> {
    const result = await this.institutionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
  }
}
