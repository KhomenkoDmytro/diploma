import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { EventType } from "src/enums/event-type.enum";
import { EventScope } from "src/enums/event-scope.enum";
import { Institution } from "src/institution/entities/institution.entity";

@Entity()
export class SchoolEvent extends AbstractEntityClass<SchoolEvent> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @Column()
  location: string;

  @Column()
  type: EventType;

  @Column()
  level: EventScope;

  @ManyToOne(() => Institution, (institution) => institution.schoolEvents)
  institution: Institution;

  @ManyToMany(() => Employee)
  @JoinTable()
  organizers: Employee[];

  @Column({ default: true })
  isActive: boolean;
}
