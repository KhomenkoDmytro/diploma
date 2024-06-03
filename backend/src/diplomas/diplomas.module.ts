import { Module } from '@nestjs/common';
import { DiplomasService } from './diplomas.service';
import { DiplomasController } from './diplomas.controller';

@Module({
  controllers: [DiplomasController],
  providers: [DiplomasService],
})
export class DiplomasModule {}
