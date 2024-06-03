import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { EventScope } from "src/enums/event-scope.enum";
import { AbstractEntityClass } from "src/database/AbstractEntityClass";

@Entity()
export class Complaint extends AbstractEntityClass<Complaint> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @Column()
  status: string;

  @ManyToOne(() => Employee, (employee) => employee.complaints)
  employee: Employee;

  @Column()
  url: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: EventScope })
  level: EventScope;
}
