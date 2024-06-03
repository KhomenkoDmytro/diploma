import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiplomasService } from './diplomas.service';
import { CreateDiplomaDto } from './dto/create-diploma.dto';
import { UpdateDiplomaDto } from './dto/update-diploma.dto';

@Controller('diplomas')
export class DiplomasController {
  constructor(private readonly diplomasService: DiplomasService) {}

  @Post()
  create(@Body() createDiplomaDto: CreateDiplomaDto) {
    return this.diplomasService.create(createDiplomaDto);
  }

  @Get()
  findAll() {
    return this.diplomasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diplomasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiplomaDto: UpdateDiplomaDto) {
    return this.diplomasService.update(+id, updateDiplomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomasService.remove(+id);
  }
}
