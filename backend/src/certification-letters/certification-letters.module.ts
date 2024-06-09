import { Module } from '@nestjs/common';
import { CertificationLetterService } from './certification-letters.service';
import { CertificationLetterController } from './certification-letters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationLetter } from './entities/certification-letter.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CertificationLetter, Employee])],
  controllers: [CertificationLetterController],
  providers: [CertificationLetterService],
})
export class CertificationLettersModule {}
