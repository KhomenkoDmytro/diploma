import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { Student } from "src/students/entities/student.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { AssignmentStatus } from "src/enums/assignment-status.enum";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";

@Entity()
export class SubjectAssignment extends AbstractEntityClass<SubjectAssignment> {
  @ManyToOne(() => Subject, (subject) => subject.assignments)
  subject: Subject;

  @ManyToOne(() => Student, (student) => student.assignments)
  student: Student;

  @ManyToOne(() => Employee, (employee) => employee.assignments)
  teacher: Employee;

  @Column({
    type: "enum",
    enum: AssignmentStatus,
  })
  status: AssignmentStatus;
  
}
