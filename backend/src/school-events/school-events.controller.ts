import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSchoolEventDto } from './dto/create-school-event.dto';
import { UpdateSchoolEventDto } from './dto/update-school-event.dto';
import { SchoolEvent } from './entities/school-event.entity';
import { SchoolEventService } from './school-events.service';

@ApiTags('SchoolEvents')
@Controller('school-events')
export class SchoolEventController {
  constructor(private readonly schoolEventService: SchoolEventService) {}

  @ApiOperation({ summary: 'Get all school events' })
  @ApiResponse({ status: 200, description: 'Return all school events.' })
  @Get()
  findAll(): Promise<SchoolEvent[]> {
    return this.schoolEventService.findAll();
  }

  @ApiOperation({ summary: 'Get a single school event by ID' })
  @ApiResponse({ status: 200, description: 'Return a single school event.' })
  @ApiResponse({ status: 404, description: 'School event not found.' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<SchoolEvent> {
    return this.schoolEventService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new school event' })
  @ApiResponse({ status: 201, description: 'The school event has been successfully created.' })
  @Post()
  create(@Body() createSchoolEventDto: CreateSchoolEventDto): Promise<SchoolEvent> {
    return this.schoolEventService.create(createSchoolEventDto);
  }

  @ApiOperation({ summary: 'Update an existing school event' })
  @ApiResponse({ status: 200, description: 'The school event has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'School event not found.' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSchoolEventDto: UpdateSchoolEventDto,
  ): Promise<SchoolEvent> {
    return this.schoolEventService.update(id, updateSchoolEventDto);
  }

  @ApiOperation({ summary: 'Delete a school event' })
  @ApiResponse({ status: 200, description: 'The school event has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'School event not found.' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.schoolEventService.remove(id);
  }
}
