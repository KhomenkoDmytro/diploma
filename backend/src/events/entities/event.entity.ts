// src/entities/event.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  location: string;

  @Column('simple-array')
  participants: string[];

  @Column()
  category: string;

  @Column()
  reminder: Date;
}
