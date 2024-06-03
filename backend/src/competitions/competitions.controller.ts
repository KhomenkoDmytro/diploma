import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Competition } from './entities/competition.entity';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionService: CompetitionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all competitions' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all competitions' })
  findAll(): Promise<Competition[]> {
    return this.competitionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get competition by id' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved competition' })
  @ApiResponse({ status: 404, description: 'Competition not found' })
  findOne(@Param('id') id: number): Promise<Competition> {
    return this.competitionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new competition' })
  @ApiResponse({ status: 201, description: 'Competition successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createCompetitionDto: CreateCompetitionDto): Promise<Competition> {
    return this.competitionService.create(createCompetitionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update competition by id' })
  @ApiResponse({ status: 200, description: 'Competition successfully updated' })
  @ApiResponse({ status: 404, description: 'Competition not found' })
  update(@Param('id') id: number, @Body() updateCompetitionDto: UpdateCompetitionDto): Promise<Competition> {
    return this.competitionService.update(id, updateCompetitionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete competition by id' })
  @ApiResponse({ status: 200, description: 'Competition successfully deleted' })
  @ApiResponse({ status: 404, description: 'Competition not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.competitionService.remove(id);
  }
}
