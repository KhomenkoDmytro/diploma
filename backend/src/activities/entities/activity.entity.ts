import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Employee } from 'src/employees/entities/employee.entity';
import { Student } from 'src/students/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum ActivityType {
  STUDENT_COMPETITION = 'Виступ учнів на конкурсі',
  STUDENT_FESTIVAL = 'Виступ учнів на фестивалі',
  STUDENT_CONCERT = 'Виступ учнів на концерті',
  TEACHER_REPORT = 'Методична доповідь викладачів',
  AWARD_RECEIVED = 'Отримання премії',
  AWARD_NOMINATION = 'Номінування на премію',
  CITY_PROJECT = 'Участь у проєкті міста',
  REGION_PROJECT = 'Участь у проєкті області',
  COUNTRY_PROJECT = 'Участь у проєкті України'
}

@Entity()
export class Activity extends AbstractEntityClass<Activity> {


  @Column({
    type: 'enum',
    enum: ActivityType
  })
  type: ActivityType;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => Employee, { nullable: true })
  teacher?: Employee;

  @ManyToOne(() => Student, { nullable: true })
  student?: Student;

}
