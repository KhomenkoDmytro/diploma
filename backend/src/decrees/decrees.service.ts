import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Decree } from "./entities/decree.entity";
import { CreateDecreeDto } from "./dto/create-decree.dto";
import { UpdateDecreeDto } from "./dto/update-decree.dto";
import { Institution } from "src/institution/entities/institution.entity";

@Injectable()
export class DecreesService {
  constructor(
    @InjectRepository(Decree)
    private readonly decreeRepository: Repository<Decree>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createDecreeDto: CreateDecreeDto) {
    const { institutionId, ...decreeData } = createDecreeDto;
    const decree = this.decreeRepository.create(decreeData);
    const institution = await this.institutionRepository.findOne({
      where: { id: createDecreeDto.institutionId },
    });
    decree.institution = institution;

    return this.decreeRepository.save(decree);
  }

  async findAll() {
    return this.decreeRepository.find();
  }

  async findOne(id: number) {
    return this.decreeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDecreeDto: UpdateDecreeDto) {
    const decree = await this.decreeRepository.findOne({ where: { id } });
    if (!decree) {
      throw new Error("Decree not found");
    }
  
    const updatedDecree = Object.assign(decree, updateDecreeDto);
  
    const institution = await this.institutionRepository.findOne({
      where: { id: updateDecreeDto.institutionId },
    });
    
    updatedDecree.institution = institution;
  
    return this.decreeRepository.save(updatedDecree);
  }
  

  async remove(id: number) {
    await this.decreeRepository.delete(id);
  }
}
