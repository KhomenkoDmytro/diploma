import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Letter } from './entities/letter.entity';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { Institution } from 'src/institution/entities/institution.entity';

@Injectable()
export class LetterService {
  constructor(
    @InjectRepository(Letter)
    private readonly letterRepository: Repository<Letter>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createLetterDto: CreateLetterDto): Promise<Letter> {
    const institution = await this.institutionRepository.findOne({where: {id: createLetterDto.institutionId}});
    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    const letter = this.letterRepository.create({
      ...createLetterDto,
      institution,
    });

    return this.letterRepository.save(letter);
  }

  async findAll(): Promise<Letter[]> {
    return this.letterRepository.find({ relations: ['institution'] });
  }

  async findOne(id: number): Promise<Letter> {
    const letter = await this.letterRepository.findOne({where:{id},  relations: ['institution'] });
    if (!letter) {
      throw new NotFoundException('Letter not found');
    }
    return letter;
  }

  async update(id: number, updateLetterDto: UpdateLetterDto): Promise<Letter> {
    const letter = await this.findOne(id);
    if (updateLetterDto.institutionId) {
      const institution = await this.institutionRepository.findOne({where:{id:updateLetterDto.institutionId}});
      if (!institution) {
        throw new NotFoundException('Institution not found');
      }
      letter.institution = institution;
    }

    Object.assign(letter, updateLetterDto);
    return this.letterRepository.save(letter);
  }

  async remove(id: number): Promise<void> {
    const letter = await this.findOne(id);
    await this.letterRepository.remove(letter);
  }
}
