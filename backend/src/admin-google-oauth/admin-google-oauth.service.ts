import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AdminUserService } from '../admin-user/admin-user.service';
import { CreateAdminUserDto } from '../admin-user/dto/create-admin-user.dto';
import { Role } from '../helpers/enums/role.enum';

@Injectable()
export class AdminGoogleOauthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly userService: AdminUserService,
  ) {}

  generateRandomPassword(length: number): string {
    const buffer = crypto.randomBytes(length);
    const password = buffer.toString('hex');
    return password;
  }

  async createAccessToken(user: any) {
    try {
      const findUser = await this.entityManager.findOne(AdminUser, {
        where: {
          email: user.email,
        },
      });
      let userData: AdminUser;
      if (!findUser) {
        const randomPassword = this.generateRandomPassword(16);
        const hashedPassword= await this.userService.hashPassword(randomPassword);
        const createAdminUserDto: CreateAdminUserDto = {
          email: user.email,
          password: hashedPassword,
          isVerified: true
        };
        userData = await this.userService.create(createAdminUserDto);
      } else {
        userData = findUser;
      }

      const { password, ...signedUserData } = userData;
      return jwt.sign(
        { user: { ...signedUserData } },
        this.configService.get<string>('JWT_SECRET_KEY'),
        {
          expiresIn: '1h',
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
