import { Module } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionController } from "./institution.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institution } from "./entities/institution.entity";
import { AdminUser } from "src/admin-user/entities/admin-user.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Student } from "src/students/entities/student.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Employee, AdminUser, Institution]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
