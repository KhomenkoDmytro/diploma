import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { SubjectType } from "src/enums/subject-type.enum";
import { StudentPerformance } from "src/student-performances/entities/student-performance.entity";
import { SubjectAssignment } from "src/subject-assignments/entities/subject-assignment.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity()
export class Subject extends AbstractEntityClass<Subject> {
  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: SubjectType,
  })
  type: SubjectType;

  @OneToMany(() => SubjectAssignment, (assignment) => assignment.student, {
    nullable: true,
  })
  assignments?: SubjectAssignment[];

  @OneToMany(() => StudentPerformance, (complaint) => complaint.subject)
  performances?: StudentPerformance[];
}
