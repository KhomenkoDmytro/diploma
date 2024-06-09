import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "src/students/entities/student.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { EventScope } from "src/enums/event-scope.enum";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";

@Entity()
export class StudentPerformance extends AbstractEntityClass<StudentPerformance>{

  @ManyToOne(() => Student, (student) => student.performances)
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.performances)
  subject: Subject;

  @ManyToOne(() => Employee, (teacher) => teacher.performances)
  teacher: Employee;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: EventScope,
  })
  level: EventScope;

  @Column({ type: "date" })
  date: Date;
  
}
