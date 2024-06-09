import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Institution } from "./entities/institution.entity";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { AdminUser } from "src/admin-user/entities/admin-user.entity";
import { Position } from "src/employees/entities/employee.entity";

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
    private entityManager: EntityManager,
  ) {}

  async addUserToInstitution(userId: number, institutionId: number) {
    try {
      const user = await this.entityManager.findOne(AdminUser, {
        where: { id: userId },
      });
      const institution = await this.entityManager.findOne(Institution, {
        where: { id: institutionId },
      });

      if (!user || !institution) {
        throw new Error("User or institution not found");
      }

      user.institution = institution;
      await this.entityManager.save(user);

      return {
        success: true,
        message: "User added to institution successfully",
      };
    } catch (error) {
      throw error;
    }
  }
  async getDecreesByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["decrees"],
    });
    return institution.decrees;
  }
  async getLettersByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["letters"],
    });
    return institution.letters;
  }

  async getCompetitionsByInstitutionId(institutionId: number) {
    console.log(institutionId);
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["competitions", "competitions.student", "competitions.teacher"],
    });
    return institution.competitions;
  }
  
  async getComplaintsByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["complaints", "complaints.employee"],
    });
    return institution.complaints;
  }

  async getStudentsByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["students"],
    });
    return institution.students;
  }
  
  async getAllEmployeesByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["employees"],
    });
    return institution.employees;
  }
  
  async getTeachersByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ["employees"],
    });
    return institution.employees.filter(employee => employee.position === Position.TEACHER);
  }
  
  async getCertificationLettersByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ['employees', 'employees.certifications'],
    });
  
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${institutionId} not found`);
    }
  
    const certificationsWithEmployees = institution.employees.flatMap(employee =>
      (employee.certifications || []).map(certification => ({
        ...certification,
        employee: {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          patronymic: employee.patronymic
        }
      }))
    );
  
    return certificationsWithEmployees;
  }

  async getSubjectAssignmentsByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ['employees', 'employees.assignments', 'employees.assignments.subject', 'employees.assignments.student']
    });
  
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${institutionId} not found`);
    }
  
    const teachersWithAssignments = institution.employees.map(employee => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      patronymic: employee.patronymic,
      assignments: (employee.assignments || []).map(assignment => ({
        ...assignment,
        subject: assignment.subject,
        student: assignment.student,
      }))
    }));
  
    return teachersWithAssignments;
  }
  
  
  

  async getStudentPerformancesByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ['employees', 'employees.performances', 'employees.performances.student', 'employees.performances.teacher'],
    });
  
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${institutionId} not found`);
    }
  
    return institution.employees.flatMap(employee => 
      employee.performances.map(performance => ({
        ...performance,
        student: performance.student ? {
          id: performance.student.id,
          firstName: performance.student.firstName,
          lastName: performance.student.lastName,
        } : null,
        teacher: performance.teacher ? {
          id: performance.teacher.id,
          firstName: performance.teacher.firstName,
          lastName: performance.teacher.lastName,
          patromymic: performance.teacher.patronymic
        } : null
      }))
    );
  }
  
  async getSchoolEventsByInstitutionId(institutionId: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id: institutionId },
      relations: ['schoolEvents', 'schoolEvents.organizers'],
    });
  
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${institutionId} not found`);
    }
  
    return institution.schoolEvents.map(event => ({
      ...event,
      organizers: event.organizers.map(organizer => ({
        id: organizer.id,
        firstName: organizer.firstName,
        lastName: organizer.lastName,
        patronymic: organizer.patronymic
      }))
    }));
  }
  

  async create(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    const institution = this.institutionRepository.create(createInstitutionDto);

    if (createInstitutionDto.adminUserId) {
      const adminUser = await this.adminUserRepository.findOne({
        where: { id: createInstitutionDto.adminUserId },
      });
      if (!adminUser) {
        throw new NotFoundException(
          `AdminUser with ID ${createInstitutionDto.adminUserId} not found`,
        );
      }
      institution.adminUsers = [adminUser];
    }

    return this.institutionRepository.save(institution);
  }

  async findAll(): Promise<Institution[]> {
    return this.institutionRepository.find({
      relations: ["adminUsers", "employees", "students"],
    });
  }

  async findOne(id: number) {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: ["adminUsers", "employees", "students"],
    });
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return institution;
  }

  async update(
    id: number,
    updateInstitutionDto: UpdateInstitutionDto,
  ): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { id },
    });

    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }

    if (updateInstitutionDto.adminUserId) {
      const adminUser = await this.adminUserRepository.findOne({
        where: { id: updateInstitutionDto.adminUserId },
      });
      if (!adminUser) {
        throw new NotFoundException(
          `AdminUser with ID ${updateInstitutionDto.adminUserId} not found`,
        );
      }
      institution.adminUsers = [adminUser];
    }

    await this.institutionRepository.update(id, updateInstitutionDto);

    const updatedInstitution = await this.institutionRepository.findOne({
      where: { id },
      relations: ["adminUsers", "employees", "students"],
    });
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
