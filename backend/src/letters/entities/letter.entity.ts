import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Letter {
  @PrimaryGeneratedColumn()
  id: number;

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
}
