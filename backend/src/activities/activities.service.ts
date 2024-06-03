import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Student } from 'src/students/entities/student.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(createActivityDto);
    if (createActivityDto.teacherId) {
      activity.teacher = await this.employeesRepository.findOne({where: {id:createActivityDto.teacherId}});
    }
    if (createActivityDto.studentId) {
      activity.student = await this.studentsRepository.findOne({where: {id:createActivityDto.teacherId}});
    }
    return this.activitiesRepository.save(activity);
  }

  findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find({ relations: ['teacher', 'student'] });
  }

  findOne(id: number): Promise<Activity> {
    return this.activitiesRepository.findOne({ where: { id }, relations: ['teacher', 'student'] });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({where: {id}});
    if (updateActivityDto.teacherId) {
      activity.teacher = await this.employeesRepository.findOne({where: {id:updateActivityDto.teacherId}});
    }
    if (updateActivityDto.studentId) {
      activity.student = await this.studentsRepository.findOne({where: {id:updateActivityDto.studentId}});
    }
    return this.activitiesRepository.save({ ...activity, ...updateActivityDto });
  }

  async remove(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
