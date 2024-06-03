import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AdminOtpCodeService } from './admin-otp-code.service';
import { CreateAdminOtpCodeDto } from './dto/create-admin-otp-code.dto';
import { UpdateAdminOtpCodeDto } from './dto/update-admin-otp-code.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin-local-auth/guards/jwt.guard';

@ApiBearerAuth('access-token')
@ApiTags('otp-code')
@UseGuards(JwtAuthGuard)
@Controller('admin-otp-code')
export class AdminOtpCodeController {
  constructor(private readonly adminOtpCodeService: AdminOtpCodeService) {}

  @Post()
  create(@Body() createAdminOtpCodeDto: CreateAdminOtpCodeDto) {
    return this.adminOtpCodeService.create(createAdminOtpCodeDto);
  }

  @Get()
  findAll() {
    return this.adminOtpCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminOtpCodeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminOtpCodeDto: UpdateAdminOtpCodeDto,
  ) {
    return this.adminOtpCodeService.update(+id, updateAdminOtpCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminOtpCodeService.remove(+id);
  }
}
