import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TopsisService } from './topsis.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('topsis')
@Controller('topsis')
export class TopsisController {
  constructor(private readonly topsisService: TopsisService) {}

  @Get()
  getTopsisResults() {
    return this.topsisService.getTopsisResults();
  }

  @Get(':id/data')
  @ApiOperation({ summary: 'Get teacher data' })
  @ApiParam({ name: 'id', type: 'number', description: 'Teacher ID' })
  @ApiResponse({ status: 200, description: 'Teacher data retrieved successfully' })
  async getTeacherData(@Param('id', ParseIntPipe) id: number) {
    return this.topsisService.getTeacherData(id);
  }
}
