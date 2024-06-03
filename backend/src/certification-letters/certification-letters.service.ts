import { Injectable } from '@nestjs/common';
import { CreateCertificationLetterDto } from './dto/create-certification-letter.dto';
import { UpdateCertificationLetterDto } from './dto/update-certification-letter.dto';

@Injectable()
export class CertificationLettersService {
  create(createCertificationLetterDto: CreateCertificationLetterDto) {
    return 'This action adds a new certificationLetter';
  }

  findAll() {
    return `This action returns all certificationLetters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificationLetter`;
  }

  update(id: number, updateCertificationLetterDto: UpdateCertificationLetterDto) {
    return `This action updates a #${id} certificationLetter`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificationLetter`;
  }
}
