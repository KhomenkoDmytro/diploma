import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin-local-auth/guards/jwt.guard';

@ApiTags('user')
@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUserService.create(createAdminUserDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Find all users' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.adminUserService.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Find user by id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.adminUserService.findOne(+id);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user by id' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.adminUserService.update(+id, updateAdminUserDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.adminUserService.remove(+id);
  }
}
