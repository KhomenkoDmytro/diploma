import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DecreesModule } from "./decrees/decrees.module";
import { EmployeesModule } from "./employees/employees.module";
import { StudentsModule } from "./students/students.module";
import { SubjectsModule } from "./subjects/subjects.module";
import { SubjectAssignmentsModule } from "./subject-assignments/subject-assignments.module";
import { TopsisModule } from "./topsis/topsis.module";
import { SchoolEventsModule } from "./school-events/school-events.module";
import { StudentPerformancesModule } from "./student-performances/student-performances.module";
import { ComplaintsModule } from "./complaints/complaints.module";
import { CompetitionsModule } from "./competitions/competitions.module";
import { AdminUserModule } from "./admin-user/admin-user.module";
import { AdminGoogleOauthModule } from "./admin-google-oauth/admin-google-oauth.module";
import { AdminLocalAuthModule } from "./admin-local-auth/admin-local-auth.module";
import { AdminOtpCodeModule } from "./admin-otp-code/admin-otp-code.module";
import { AwsSesModule } from "./aws-ses/aws-ses.module";
import { InstitutionModule } from "./institution/institution.module";
import { CertificationLettersModule } from "./certification-letters/certification-letters.module";
import { LettersModule } from "./letters/letters.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
    const configForAdmin = new DocumentBuilder()
    .setTitle('Admin part of prowash')
    .setDescription('API for admin of prowash')
    .setVersion('1.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configForAdmin, {
    include: [
      AwsSesModule,
      DecreesModule,
      EmployeesModule,
      StudentsModule,
      SubjectsModule,
      SubjectAssignmentsModule,
      SchoolEventsModule,
      StudentPerformancesModule,
      ComplaintsModule,
      CompetitionsModule,
      TopsisModule,
      AdminUserModule,
      AdminGoogleOauthModule,
      AdminLocalAuthModule,
      AdminOtpCodeModule,
      InstitutionModule,
      CertificationLettersModule,
      LettersModule
    ],
  });
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.NESTJS_PORT);
}
bootstrap();
