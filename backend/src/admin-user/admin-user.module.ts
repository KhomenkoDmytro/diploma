import { Module } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AdminUserController } from './admin-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { AdminOtpCode } from '../admin-otp-code/entities/admin-otp-code.entity';
import { Institution } from 'src/institution/entities/institution.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminUser, AdminOtpCode, Institution])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService]
})
export class AdminUserModule {}
