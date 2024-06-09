import { Module } from '@nestjs/common';
import { LetterService } from './letters.service';
import { LetterController } from './letters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/institution/entities/institution.entity';
import { Letter } from './entities/letter.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Institution, Letter])],
  controllers: [LetterController],
  providers: [LetterService],
})
export class LettersModule {}
