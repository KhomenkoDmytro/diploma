// src/entities/department.entity.ts
import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department extends AbstractEntityClass<Department> {

  @Column()
  managerId: number;

  @Column()
  name: string;
}
