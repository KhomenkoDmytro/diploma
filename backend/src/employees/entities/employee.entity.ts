import { Activity } from 'src/activities/entities/activity.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Gender } from 'src/enums/gender.enum';
import { Institution } from 'src/institution/entities/institution.entity';
import { SchoolEvent } from 'src/school-events/entities/school-event.entity';
import { StudentPerformance } from 'src/student-performances/entities/student-performance.entity';
import { SubjectAssignment } from 'src/subject-assignments/entities/subject-assignment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';



export enum EmploymentType {
  FULL_TIME = 'повний робочий день',
  PART_TIME = 'неповний робочий день',
  CONTRACT = 'контракт',
}

export enum Position {
  TEACHER = 'викладач',
  CLEANER = 'прибиральниця',
  ADMINISTRATOR = 'адміністратор',
  DIRECTOR = 'директор',
  CHIEF_ACCOUNTANT = 'головний бухгалтер',
  ACCOUNTANT_ASSISTANT = 'помічник бухгалтера',
  DEPUTY = 'завуч',
  SECURITY = 'охоронець',
  INSTRUMENT_TECHNICIAN = 'настроювач інструментів',
  ESTATE_MANAGER = 'завгосп',
  }

@Entity()
export class Employee extends AbstractEntityClass<Employee> {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: EmploymentType,
  })
  employmentType: EmploymentType;

  @Column()
  identificationNumber: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'enum',
    enum: Position,
  })
  position: Position;

  @Column({ nullable: true })
  residenceAddress?: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  actualAddress?: string;

  @OneToMany(() => SubjectAssignment, assignment => assignment.teacher, { nullable: true })
  assignments?: SubjectAssignment[];

  @OneToMany(() => Activity, activity => activity.teacher)
  activities?: Activity[];
  
  @OneToMany(() => Competition, competition => competition.teacher)
  competitions?: Competition[];

  @ManyToMany(() => SchoolEvent, event => event.organizers)
  organizedEvents?: SchoolEvent[];

  @OneToMany(() => Complaint, complaint => complaint.employee)
  complaints?: Complaint[];

  @OneToMany(() => StudentPerformance, complaint => complaint.teacher)
  performances?: StudentPerformance[];

  @ManyToOne(() => Institution, (institution) => institution.employees)
  institution: Institution;

}
