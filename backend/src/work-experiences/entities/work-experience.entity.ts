// src/entities/workExperience.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  days: number;
}
