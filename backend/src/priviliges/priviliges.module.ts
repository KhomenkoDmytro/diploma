import { Module } from '@nestjs/common';
import { PriviligesService } from './priviliges.service';
import { PriviligesController } from './priviliges.controller';

@Module({
  controllers: [PriviligesController],
  providers: [PriviligesService],
})
export class PriviligesModule {}
