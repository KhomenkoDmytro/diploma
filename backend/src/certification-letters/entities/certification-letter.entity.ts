// src/entities/certificationLetter.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CertificationLetter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column({
    type: 'enum',
    enum: ['JUNIOR', 'SENIOR', 'LEAD'],
  })
  previousRank: string;

  @Column({
    type: 'enum',
    enum: ['JUNIOR', 'SENIOR', 'LEAD'],
  })
  newRank: string;

  @Column()
  issuanceDate: Date;

  @Column({
    type: 'enum',
    enum: ['TEACHER', 'PROFESSOR', 'LECTURER'],
  })
  jobTitle: string;

  @Column({
    type: 'enum',
    enum: ['MATH', 'SCIENCE', 'LITERATURE'],
  })
  subject: string;

  @Column('text')
  note: string;
}
