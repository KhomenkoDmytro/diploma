import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificationLettersService } from './certification-letters.service';
import { CreateCertificationLetterDto } from './dto/create-certification-letter.dto';
import { UpdateCertificationLetterDto } from './dto/update-certification-letter.dto';

@Controller('certification-letters')
export class CertificationLettersController {
  constructor(private readonly certificationLettersService: CertificationLettersService) {}

  @Post()
  create(@Body() createCertificationLetterDto: CreateCertificationLetterDto) {
    return this.certificationLettersService.create(createCertificationLetterDto);
  }

  @Get()
  findAll() {
    return this.certificationLettersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificationLettersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificationLetterDto: UpdateCertificationLetterDto) {
    return this.certificationLettersService.update(+id, updateCertificationLetterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationLettersService.remove(+id);
  }
}
