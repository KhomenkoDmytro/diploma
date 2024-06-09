import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { CompetitionResult } from "src/enums/competition-result.enum";
import { CompetitionType } from "src/enums/competition-type.enum";
import { EventScope } from "src/enums/event-scope.enum";
import { Institution } from "src/institution/entities/institution.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Competition extends AbstractEntityClass<Competition> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ default: EventScope.CITY })
  level: EventScope;

  @Column()
  result: CompetitionResult;

  @Column()
  competitionType: CompetitionType;

  @ManyToOne(() => Student, (student) => student.competitions)
  student: Student;

  @ManyToOne(() => Employee, (teacher) => teacher.competitions)
  teacher: Employee;

  @ManyToOne(() => Institution, (institution) => institution.competitions)
  institution?: Institution;
}
