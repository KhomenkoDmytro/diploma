import { AdminUser } from "src/admin-user/entities/admin-user.entity";
import { Competition } from "src/competitions/entities/competition.entity";
import { Complaint } from "src/complaints/entities/complaint.entity";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { Decree } from "src/decrees/entities/decree.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Letter } from "src/letters/entities/letter.entity";
import { SchoolEvent } from "src/school-events/entities/school-event.entity";
import { Student } from "src/students/entities/student.entity";
import { Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";

@Entity()
export class Institution extends AbstractEntityClass<Institution> {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  accessKey: string;

  @OneToMany(() => AdminUser, (adminUser) => adminUser.institution)
  adminUsers: AdminUser[];

  @OneToMany(() => Employee, (employee) => employee.institution)
  employees: Employee[];

  @OneToMany(() => Student, (student) => student.institution)
  students: Student[];

  @OneToMany(() => Decree, (decree) => decree.institution)
  decrees: Decree[];

  @OneToMany(() => Competition, (competition) => competition.institution)
  competitions: Competition[];

  @OneToMany(() => Complaint, (complaint) => complaint.institution)
  complaints: Complaint[];

  @OneToMany(() => SchoolEvent, (schoolEvent) => schoolEvent.institution)
  schoolEvents: SchoolEvent[];

  @OneToMany(() => Letter, (letter) => letter.institution)
  letters: Letter[];
}
