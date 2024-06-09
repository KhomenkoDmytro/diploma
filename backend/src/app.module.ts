import { Module } from "@nestjs/common";
import { AwsSesModule } from "./aws-ses/aws-ses.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./employees/employees.module";
import { StudentsModule } from "./students/students.module";
import { VacationsModule } from "./vacations/vacations.module";
import { DepartmentsModule } from "./departments/departments.module";
import { CertificationLettersModule } from "./certification-letters/certification-letters.module";
import { SubjectAssignmentsModule } from "./subject-assignments/subject-assignments.module";
import { MonthPricesModule } from "./month-prices/month-prices.module";
import { PriviligesModule } from "./priviliges/priviliges.module";
import { MonthPaymentsModule } from "./month-payments/month-payments.module";
import { LettersModule } from "./letters/letters.module";
import { DecreesModule } from "./decrees/decrees.module";
import { SubjectsModule } from "./subjects/subjects.module";
import { TopsisModule } from "./topsis/topsis.module";
import { CompetitionsModule } from "./competitions/competitions.module";
import { SchoolEventsModule } from "./school-events/school-events.module";
import { ComplaintsModule } from "./complaints/complaints.module";
import { StudentPerformancesModule } from "./student-performances/student-performances.module";
import { AdminUserModule } from "./admin-user/admin-user.module";
import { AdminGoogleOauthModule } from "./admin-google-oauth/admin-google-oauth.module";
import { AdminLocalAuthModule } from "./admin-local-auth/admin-local-auth.module";
import { AdminOtpCodeModule } from "./admin-otp-code/admin-otp-code.module";
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AwsSesModule,
    EmployeesModule,
    StudentsModule,
    StudentsModule,
    VacationsModule,
    DepartmentsModule,
    CertificationLettersModule,
    SubjectAssignmentsModule,
    MonthPricesModule,
    PriviligesModule,
    MonthPaymentsModule,
    LettersModule,
    DecreesModule,
    SubjectsModule,
    TopsisModule,
    CompetitionsModule,
    SchoolEventsModule,
    ComplaintsModule,
    StudentPerformancesModule,
    AdminUserModule,
    AdminGoogleOauthModule,
    AdminLocalAuthModule,
    AdminOtpCodeModule,
    InstitutionModule,
    LettersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
