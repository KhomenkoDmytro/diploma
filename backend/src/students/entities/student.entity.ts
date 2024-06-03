// src/students/student.entity.ts
import { Competition } from 'src/competitions/entities/competition.entity';
import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Gender } from 'src/enums/gender.enum';
import { Institution } from 'src/institution/entities/institution.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { SubjectAssignment } from 'src/subject-assignments/entities/subject-assignment.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Student extends AbstractEntityClass<Student> {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  identificationNumber: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;
  
  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ nullable: true })
  residenceAddress?: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  actualAddress?: string;

  @OneToMany(() => SubjectAssignment, assignment => assignment.student, { nullable: true })
  assignments?: SubjectAssignment[];

  @OneToMany(() => Competition, competition => competition.student)
  competitions?: Competition[];
  
  @OneToMany(() => StudentPerformance, studentPerformance => studentPerformance.student)
  performances?: StudentPerformance[];

  @ManyToOne(() => Institution, (institution) => institution.students)
  institution: Institution;

  
}
