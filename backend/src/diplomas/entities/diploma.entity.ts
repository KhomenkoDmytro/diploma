// src/entities/activity.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['SPORT', 'CULTURAL', 'ACADEMIC'],
  })
  type: string;

  @Column()
  place: string;
}
