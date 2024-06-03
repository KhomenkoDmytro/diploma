import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DecreesService } from './decrees.service';
import { CreateDecreeDto } from './dto/create-decree.dto';
import { UpdateDecreeDto } from './dto/update-decree.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('decrees')
@Controller('decrees')
export class DecreesController {
  constructor(private readonly decreesService: DecreesService) {}

  @Post()
  create(@Body() createDecreeDto: CreateDecreeDto) {
    return this.decreesService.create(createDecreeDto);
  }

  @Get()
  findAll() {
    return this.decreesService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decreesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDecreeDto: UpdateDecreeDto) {
    return this.decreesService.update(+id, updateDecreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decreesService.remove(+id);
  }
}
