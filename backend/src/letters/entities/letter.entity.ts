import { AbstractEntityClass } from 'src/database/AbstractEntityClass.entity';
import { Institution } from 'src/institution/entities/institution.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Letter extends AbstractEntityClass<Letter> {

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  whom: string;

  @Column()
  url: string;

  @ManyToOne(() => Institution, (institution) => institution.employees)
  institution: Institution;
}
