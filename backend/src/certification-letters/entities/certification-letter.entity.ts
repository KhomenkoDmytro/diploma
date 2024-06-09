import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Rank } from 'src/enums/teacher-rank.enum';
import { JobTitle } from 'src/enums/job-titlle.enum';
import { Instrument } from 'src/enums/instrument.enum';
import { AbstractEntityClass } from 'src/database/AbstractEntityClass.entity';

@Entity()
export class CertificationLetter extends AbstractEntityClass<CertificationLetter> {

  @ManyToOne(() => Employee, (employee) => employee.certifications)
  employee: Employee;

  @Column({
    type: 'enum',
    enum: Rank,
  })
  previousRank: Rank;

  @Column({
    type: 'enum',
    enum: Rank,
  })
  currentRank: Rank;

  @Column()
  issuanceDate: Date;

  @Column({
    type: 'enum',
    enum: JobTitle,
  })
  jobTitle: JobTitle;

  @Column({
    type: 'enum',
    enum: Instrument,
  })
  subject: Instrument;

  @Column('text')
  note: string;
}
