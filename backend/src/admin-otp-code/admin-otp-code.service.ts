import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminOtpCodeDto } from './dto/create-admin-otp-code.dto';
import { UpdateAdminOtpCodeDto } from './dto/update-admin-otp-code.dto';
import { EntityManager, Repository } from 'typeorm';
import { AdminOtpCode } from './entities/admin-otp-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { isIdNumber } from '../helpers/isIdNumber';
import { OtpStatus } from '../helpers/enums/otp-status.enum';
import { validateGetById } from '../helpers/validateGetById';

@Injectable()
export class AdminOtpCodeService {
  constructor(
    @InjectRepository(AdminOtpCode)
    private readonly otpCodeRepository: Repository<AdminOtpCode>,
    private readonly entityManager: EntityManager,
  ) {}

  calculateExpirationTime(expirationMinutes: number): Date {
    const now = new Date();
    const expirationTime = new Date(
      now.getTime() + expirationMinutes * 60 * 1000,
    );
    return expirationTime;
  }

  isOtpExpired(expirationTime: Date): boolean {
    const now = new Date();
    return now > expirationTime;
  }

  async create(createAdminOtpCodeDto: CreateAdminOtpCodeDto) {
    try {
      const { user_id, expiration_minutes, type, value } =
        createAdminOtpCodeDto;

      const user = await this.entityManager.findOne(AdminUser, {
        where: { id: user_id },
      });

      if (!user) {
        throw new HttpException(
          `User with id ${createAdminOtpCodeDto.user_id} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingOtps = await this.otpCodeRepository
        .createQueryBuilder('otp')
        .leftJoinAndSelect('otp.user', 'user')
        .where('user.id = :userId', { userId: user.id })
        .andWhere('otp.type = :type', { type })
        .andWhere("otp.status = 'unused'")
        .getMany();

      if (existingOtps && existingOtps.length > 0) {
        existingOtps.forEach(async (otp) => {
          otp.status = OtpStatus.INVALID;
          console.log('invalid');
          await this.otpCodeRepository.save(otp);
        });
      }

      const expirationTime = this.calculateExpirationTime(expiration_minutes);

      const otpCode = this.otpCodeRepository.create({
        value,
        expiration_time: expirationTime,
        user,
        type,
      });

      await this.otpCodeRepository.save(otpCode);
      return {
        value: otpCode.value,
        type: otpCode.type,
        status: otpCode.status,
        user_id: user.id,
        expiration_time: otpCode.expiration_time,
        created_at: otpCode.created_at,
        updated_at: otpCode.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.otpCodeRepository.find();
  }

  async findOne(id: number) {
    try {
      isIdNumber(id);
      const otpCode = await this.otpCodeRepository.findOne({ where: { id } });
      validateGetById(id, otpCode, 'otp code');
      return otpCode;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateAdminOtpCodeDto: UpdateAdminOtpCodeDto) {
    try {
      isIdNumber(id);
      const otpCode = await this.otpCodeRepository.findOne({ where: { id } });
      if (!otpCode) {
        throw new HttpException(
          `OTP with id ${id} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      this.otpCodeRepository.merge(otpCode, {
        ...updateAdminOtpCodeDto,
      });
      return await this.otpCodeRepository.save(otpCode);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return this.otpCodeRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
