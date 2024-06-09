import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CertificationLetterService } from './certification-letters.service';
import { CreateCertificationLetterDto } from './dto/create-certification-letter.dto';
import { UpdateCertificationLetterDto } from './dto/update-certification-letter.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CertificationLetter } from './entities/certification-letter.entity';

@ApiTags('certification-letters')
@Controller('certification-letters')
export class CertificationLetterController {
  constructor(private readonly certificationLetterService: CertificationLetterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new certification letter' })
  @ApiResponse({ status: 201, description: 'The certification letter has been successfully created.', type: CertificationLetter })
  create(@Body() createCertificationLetterDto: CreateCertificationLetterDto) {
    return this.certificationLetterService.create(createCertificationLetterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all certification letters' })
  @ApiResponse({ status: 200, description: 'List of all certification letters', type: [CertificationLetter] })
  findAll() {
    return this.certificationLetterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certification letter by ID' })
  @ApiResponse({ status: 200, description: 'The certification letter', type: CertificationLetter })
  findOne(@Param('id') id: string) {
    return this.certificationLetterService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a certification letter' })
  @ApiResponse({ status: 200, description: 'The certification letter has been successfully updated.', type: CertificationLetter })
  update(@Param('id') id: string, @Body() updateCertificationLetterDto: UpdateCertificationLetterDto) {
    return this.certificationLetterService.update(+id, updateCertificationLetterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a certification letter' })
  @ApiResponse({ status: 204, description: 'The certification letter has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.certificationLetterService.remove(+id);
  }
}
