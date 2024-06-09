import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Letter } from './entities/letter.entity';
import { LetterService } from './letters.service';

@ApiTags('letters')
@Controller('letters')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new letter' })
  @ApiResponse({ status: 201, description: 'The letter has been successfully created.', type: Letter })
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.letterService.create(createLetterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all letters' })
  @ApiResponse({ status: 200, description: 'List of all letters', type: [Letter] })
  findAll() {
    return this.letterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a letter by ID' })
  @ApiResponse({ status: 200, description: 'The letter', type: Letter })
  findOne(@Param('id') id: string) {
    return this.letterService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a letter' })
  @ApiResponse({ status: 200, description: 'The letter has been successfully updated.', type: Letter })
  update(@Param('id') id: string, @Body() updateLetterDto: UpdateLetterDto) {
    return this.letterService.update(+id, updateLetterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a letter' })
  @ApiResponse({ status: 204, description: 'The letter has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.letterService.remove(+id);
  }
}
