import { Module } from '@nestjs/common';
import { DecreesService } from './decrees.service';
import { DecreesController } from './decrees.controller';
import { Decree } from './entities/decree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/institution/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Decree, Institution])],
  controllers: [DecreesController],
  providers: [DecreesService],
})
export class DecreesModule {}
