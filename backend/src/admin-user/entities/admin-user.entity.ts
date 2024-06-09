import { AdminOtpCode } from "src/admin-otp-code/entities/admin-otp-code.entity";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { Role } from "src/helpers/enums/role.enum";
import { Institution } from "src/institution/entities/institution.entity";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class AdminUser extends AbstractEntityClass<AdminUser> {
  @Column({ default: Role.ADMIN })
  role: Role;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => AdminOtpCode, (otp) => otp.user)
  otps: AdminOtpCode[];

  @ManyToOne(() => Institution, (institution) => institution.adminUsers)
  institution?: Institution;
}
