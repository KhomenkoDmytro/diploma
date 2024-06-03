import { Module } from '@nestjs/common';
import { AdminOtpCodeService } from './admin-otp-code.service';
import { AdminOtpCodeController } from './admin-otp-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminOtpCode } from './entities/admin-otp-code.entity';
import { AdminUser } from '../admin-user/entities/admin-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminOtpCode, AdminUser])],
  controllers: [AdminOtpCodeController],
  providers: [AdminOtpCodeService],
  exports:[AdminOtpCodeService]
})
export class AdminOtpCodeModule {}
