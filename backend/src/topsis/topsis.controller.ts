import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TopsisService } from './topsis.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopsisDto } from './dto/create-topsi.dto';

@ApiTags('topsis')
@Controller('topsis')
export class TopsisController {
  constructor(private readonly topsisService: TopsisService) {}

  @Post()
  getTopsisResults(@Body() topsisDto:CreateTopsisDto) {
    return this.topsisService.getTopsisResults(topsisDto);
  }

  @Get(':id/data')
  @ApiOperation({ summary: 'Get teacher data' })
  @ApiParam({ name: 'id', type: 'number', description: 'Teacher ID' })
  @ApiResponse({ status: 200, description: 'Teacher data retrieved successfully' })
  async getTeacherData(@Param('id', ParseIntPipe) id: number) {
    return this.topsisService.getTeacherData(id);
  }
}
