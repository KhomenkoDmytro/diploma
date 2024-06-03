import { Module } from '@nestjs/common';
import { DecreesService } from './decrees.service';
import { DecreesController } from './decrees.controller';
import { Decree } from './entities/decree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Decree])],
  controllers: [DecreesController],
  providers: [DecreesService],
})
export class DecreesModule {}
