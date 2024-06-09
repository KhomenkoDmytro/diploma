// src/entities/paymentPerMonth.entity.ts
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MonthPayment extends AbstractEntityClass<MonthPayment> {
  @Column()
  subjectAssignmentId: number;

  @Column()
  pricePerMonth: number;

  @Column()
  privilegeId: number;
}
