import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { AbstractEntityClass } from "src/database/AbstractEntityClass";
import { EventType } from "src/enums/event-type.enum";

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

  @ManyToMany(() => Employee)
  @JoinTable()
  organizers: Employee[];

  @Column({ default: true })
  isActive: boolean;
}
