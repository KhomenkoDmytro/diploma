import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { AdminUser } from './entities/admin-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isIdNumber } from '../helpers/isIdNumber';
import { validateGetById } from '../helpers/validateGetById';
import { isUniquePropertyValue } from '../helpers/isUniquePropertyValue';
import { Institution } from 'src/institution/entities/institution.entity';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly userRepository: Repository<AdminUser>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async create(createAdminUserDto: CreateAdminUserDto) {
    try {
      await isUniquePropertyValue(
        'email',
        createAdminUserDto.email,
        this.userRepository,
      );

      const passwordHash = await this.hashPassword(createAdminUserDto.password);

  

      const user = new AdminUser({
        ...createAdminUserDto,
        password: passwordHash,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find({ relations: ['institution'] });
  }

  async findOne(id: number) {
    try {
      isIdNumber(id);
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['otps', 'institution'],
      });
      validateGetById(id, user, 'user');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async isPasswordChanged(previousPassword: string, newPassword: string) {
    if (previousPassword !== newPassword) {
      const isUnchangedPassword = this.checkPassword(
        newPassword,
        previousPassword,
      );
      if (isUnchangedPassword) {
        return await this.hashPassword(newPassword);
      }
    }
    return false;
  }

  async update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    try {
      const user = await this.findOne(id);
      await isUniquePropertyValue(
        'email',
        updateAdminUserDto.email,
        this.userRepository,
        id,
      );

      const passwordHash = await this.isPasswordChanged(
        user.password,
        updateAdminUserDto.password,
      );

      const institution = updateAdminUserDto.institutionId
        ? await this.institutionRepository.findOne({ where: { id: updateAdminUserDto.institutionId } })
        : user.institution;

      if (updateAdminUserDto.institutionId && !institution) {
        throw new NotFoundException(`Institution with ID ${updateAdminUserDto.institutionId} not found`);
      }

      if (passwordHash) {
        this.userRepository.merge(user, {
          ...updateAdminUserDto,
          password: passwordHash,
          institution,
        });
      } else {
        this.userRepository.merge(user, {
          ...updateAdminUserDto,
          institution,
        });
      }

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async checkPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isEqual = await bcrypt.compare(inputPassword, hashedPassword);
    console.log(isEqual);
    return isEqual;
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
