import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create, all, MathJsStatic } from "mathjs";
import { Competition } from "src/competitions/entities/competition.entity";
import { Complaint } from "src/complaints/entities/complaint.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Institution } from "src/institution/entities/institution.entity";
import { InstitutionService } from "src/institution/institution.service";
import { SchoolEvent } from "src/school-events/entities/school-event.entity";
import { StudentPerformance } from "src/student-performances/entities/student-performance.entity";
import { Repository } from "typeorm";
import { CreateTopsisDto } from "./dto/create-topsi.dto";

const math: MathJsStatic = create(all);

@Injectable()
export class TopsisService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(StudentPerformance)
    private readonly studentPerformanceRepository: Repository<StudentPerformance>,
    @InjectRepository(SchoolEvent)
    private readonly schoolEventRepository: Repository<SchoolEvent>,
    @InjectRepository(Competition)
    private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    @Inject(InstitutionService)
    private readonly institutionService: InstitutionService,
  ) {}

  normalize(matrix: number[][]): number[][] {
    const normMatrix = matrix.map((row) =>
      row.map(
        (value, index) =>
          value /
          Math.sqrt(math.sum(matrix.map((row) => row[index] ** 2)) || 1),
      ),
    );
    return normMatrix;
  }

  weightedNormalize(matrix: number[][], weights: number[]): number[][] {
    return matrix.map((row) =>
      row.map((value, index) => value * weights[index]),
    );
  }

  calculateIdealSolutions(
    matrix: number[][],
    isBenefit: boolean[],
  ): { ideal: number[]; antiIdeal: number[] } {
    const transposeMatrix = math.transpose(matrix) as number[][];
    const ideal = transposeMatrix.map((row, index) =>
      isBenefit[index] ? Math.max(...row) : Math.min(...row),
    );
    const antiIdeal = transposeMatrix.map((row, index) =>
      isBenefit[index] ? Math.min(...row) : Math.max(...row),
    );
    return { ideal, antiIdeal };
  }

  calculateDistances(
    matrix: number[][],
    ideal: number[],
    antiIdeal: number[],
  ): { idealDistances: number[]; antiIdealDistances: number[] } {
    const idealDistances = matrix.map((row) =>
      Math.sqrt(
        math.sum(row.map((value, index) => (value - ideal[index]) ** 2)) || 0,
      ),
    );
    const antiIdealDistances = matrix.map((row) =>
      Math.sqrt(
        math.sum(row.map((value, index) => (value - antiIdeal[index]) ** 2)) ||
          0,
      ),
    );
    return { idealDistances, antiIdealDistances };
  }

  calculateTopsisScores(
    idealDistances: number[],
    antiIdealDistances: number[],
  ): number[] {
    return idealDistances.map(
      (dPlus, index) =>
        antiIdealDistances[index] / (dPlus + antiIdealDistances[index] || 1),
    );
  }

  calculateTopsis(
    matrix: number[][],
    weights: number[],
    isBenefit: boolean[],
  ): number[] {
    const normalizedMatrix = this.normalize(matrix);
    const weightedMatrix = this.weightedNormalize(normalizedMatrix, weights);
    const { ideal, antiIdeal } = this.calculateIdealSolutions(
      weightedMatrix,
      isBenefit,
    );
    const { idealDistances, antiIdealDistances } = this.calculateDistances(
      weightedMatrix, ideal, antiIdeal,
    );
    const scores = this.calculateTopsisScores(
      idealDistances,
      antiIdealDistances,
    );
    return scores;
  }

  async getTeacherData(teacherId: number, startDate?: Date, endDate?: Date) {
    const teacher = await this.employeeRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const studentPerformances = await this.studentPerformanceRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ["student", "subject", "teacher"],
    });

    const schoolEvents = await this.schoolEventRepository.find({
      where: { organizers: { id: teacherId } },
      relations: ["organizers"],
    });

    const competitions = await this.competitionRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ["student", "teacher"],
    });

    const complaints = await this.complaintRepository.find({
      where: { employee: { id: teacherId } },
      relations: ["employee"],
    });

    const filterByDate = (items, dateField) => {
      if (startDate || endDate) {
        return items.filter((item) => {
          const date = new Date(item[dateField]);
          return (
            (!startDate || date >= new Date(startDate)) &&
            (!endDate || date <= new Date(endDate))
          );
        });
      }
      return items;
    };

    return {
      studentPerformances: filterByDate(studentPerformances, "date"),
      schoolEvents: filterByDate(schoolEvents, "date"),
      competitions: filterByDate(competitions, "date"),
      complaints: filterByDate(complaints, "date"),
    };
  }

  async calculateTeacherScores(
    teacherId: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const { competitions, studentPerformances, schoolEvents, complaints } =
      await this.getTeacherData(teacherId, startDate, endDate);

    console.log({
      competitions,
      studentPerformances,
      schoolEvents,
      complaints,
    });

    const contestWeights = [5, 1, 3];
    const values = {
      contestType: { professional: 9, multigenre: 1 },
      contestPlace: {
        grand_prix: 10,
        first: 9,
        second: 7,
        third: 5,
        fourth: 3,
        participation: 1,
      },
      contestLevel: { international: 7, national: 5, regional: 3, city: 1 },
      eventLevel: {
        international: 9,
        national: 7,
        regional: 5,
        city: 3,
        school: 1,
      },
      organizedEvents: {
        master_class: 5,
        festival: 5,
        concert: 3,
        report: 1,
        open_lesson: 1,
      },
      complaints: {
        school: 1,
        city: 3,
        regional: 5,
        national: 7,
        international: 9,
      },
      performanceLevel: {
        international: 9,
        national: 7,
        regional: 5,
        city: 3,
        school: 1,
        extracurricular: 1,
      },
    };

    let contestScore = 0;
    let performanceScore = 0;
    let organizedEventsScore = 0;
    let complaintsScore = 0;

    competitions.forEach((competition) => {
      contestScore +=
        (values.contestType[competition.competitionType.toLowerCase()] || 0) *
          contestWeights[0] +
        (values.contestPlace[competition.result.toLowerCase()] || 0) *
          contestWeights[1] +
        (values.contestLevel[competition.level.toLowerCase()] || 0) *
          contestWeights[2];
    });

    studentPerformances.forEach((performance) => {
      performanceScore +=
        values.performanceLevel[performance.level.toLowerCase()] || 0;
    });

    schoolEvents.forEach((event) => {
      organizedEventsScore +=
        values.organizedEvents[event.type.toLowerCase()] || 0;
    });

    complaints.forEach((complaint) => {
      complaintsScore += values.complaints[complaint.level.toLowerCase()] || 0;
    });

    return {
      contestScore,
      performanceScore,
      organizedEventsScore,
      complaintsScore,
    };
  }

  async getTeacherMatrix(
    institutionId: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const teachers =
      await this.institutionService.getTeachersByInstitutionId(institutionId);

    const teacherMatrices = await Promise.all(
      teachers.map(async (teacher) => {
        const scores = await this.calculateTeacherScores(
          teacher.id,
          startDate,
          endDate,
        );
        return {
          teacherId: teacher.id,
          teacherName: `${teacher.firstName} ${teacher.lastName}`,
          scores: [
            scores.contestScore,
            scores.performanceScore,
            scores.organizedEventsScore,
            scores.complaintsScore,
          ],
        };
      }),
    );

    return teacherMatrices;
  }

  async getTopsisResults(createTopsisDto: CreateTopsisDto) {
    const { institutionId, startDate: startDateString, endDate: endDateString } = createTopsisDto;
    const startDate = startDateString ? new Date(startDateString) : undefined;
    const endDate = endDateString ? new Date(endDateString) : undefined;
    const teacherMatrices = await this.getTeacherMatrix(
      institutionId,
      startDate,
      endDate,
    );
    const matrix = teacherMatrices.map((tm) => tm.scores);
    const weights = [5, 1, 3, 7];
    const isBenefit = [true, true, true, false];
    const scores = this.calculateTopsis(matrix, weights, isBenefit);
    return teacherMatrices.map((tm, index) => ({
      teacherId: tm.teacherId,
      teacherName: tm.teacherName,
      contestScore: tm.scores[0],
      performanceScore: tm.scores[1],
      organizedEventsScore: tm.scores[2],
      complaintsScore: tm.scores[3],
      topsisScore: scores[index],
    }));
  }
}
