import { AbstractEntityClass } from 'src/database/AbstractEntityClass';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum DecreeType {
  PERSONNEL = 'кадровий',
  GENERAL = 'загальний'
}

@Entity()
export class Decree extends AbstractEntityClass<Decree>{

  @Column()
  number: string;

  @Column({
    type: 'enum',
    enum: DecreeType,
    default: DecreeType.GENERAL
  })
  type: DecreeType;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  url: string;

 

}
