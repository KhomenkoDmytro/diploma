import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
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
    return this.complaintRepository.save(complaint);
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto): Promise<Complaint> {
    await this.complaintRepository.update(id, updateComplaintDto);
    const updatedComplaint = await this.complaintRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!updatedComplaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
    return updatedComplaint;
  }

  async remove(id: number): Promise<void> {
    const result = await this.complaintRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
  }
}
