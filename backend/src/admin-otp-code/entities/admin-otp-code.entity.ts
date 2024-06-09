import { Entity, Column, ManyToOne } from "typeorm";
import { AbstractEntityClass } from "src/database/AbstractEntityClass.entity";
import { OtpStatus } from "src/helpers/enums/otp-status.enum";
import { OtpType } from "src/helpers/enums/otp-type.enum";
import { AdminUser } from "src/admin-user/entities/admin-user.entity";

@Entity()
export class AdminOtpCode extends AbstractEntityClass<AdminOtpCode> {
  @Column()
  value: string;

  @Column()
  expiration_time: Date;

  @Column({
    type: "enum",
    enum: OtpType,
  })
  type: OtpType;

  @Column({
    type: "enum",
    enum: OtpStatus,
    default: "unused",
  })
  status: OtpStatus;

  @ManyToOne(() => AdminUser, (user) => user.otps)
  user: AdminUser;
}
