import { AdminUser } from "src/admin-user/entities/admin-user.entity";
import { AbstractEntityClass } from "src/database/AbstractEntityClass";
import { Employee } from "src/employees/entities/employee.entity";
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
}
