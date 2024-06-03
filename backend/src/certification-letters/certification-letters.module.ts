import { Module } from '@nestjs/common';
import { CertificationLettersService } from './certification-letters.service';
import { CertificationLettersController } from './certification-letters.controller';

@Module({
  controllers: [CertificationLettersController],
  providers: [CertificationLettersService],
})
export class CertificationLettersModule {}
