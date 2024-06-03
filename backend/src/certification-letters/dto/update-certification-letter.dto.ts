import { PartialType } from '@nestjs/swagger';
import { CreateCertificationLetterDto } from './create-certification-letter.dto';

export class UpdateCertificationLetterDto extends PartialType(CreateCertificationLetterDto) {}
