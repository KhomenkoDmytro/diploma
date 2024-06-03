import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parent extends AbstractEntityClass<Parent> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: ['MOTHER', 'FATHER'],
  })
  parentType: string;

  @Column()
  studentId: number;
}
