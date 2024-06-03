// src/entities/task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  startDate: Date;

  @Column()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  })
  priority: string;

  @Column()
  order: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
  })
  status: string;

  @Column()
  assignedTo: number;

  @Column()
  category: string;
}
