import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriviligesService } from './priviliges.service';
import { CreatePriviligeDto } from './dto/create-privilige.dto';
import { UpdatePriviligeDto } from './dto/update-privilige.dto';

@Controller('priviliges')
export class PriviligesController {
  constructor(private readonly priviligesService: PriviligesService) {}

  @Post()
  create(@Body() createPriviligeDto: CreatePriviligeDto) {
    return this.priviligesService.create(createPriviligeDto);
  }

  @Get()
  findAll() {
    return this.priviligesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priviligesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriviligeDto: UpdatePriviligeDto) {
    return this.priviligesService.update(+id, updatePriviligeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priviligesService.remove(+id);
  }
}
