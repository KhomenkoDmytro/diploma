// src/entities/vacation.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vacation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['ANNUAL', 'SICK', 'MATERNITY'],
  })
  type: string;

  @Column()
  employeeId: number;

  @Column()
  startDate: Date;

  @Column()
  days: number;
}
