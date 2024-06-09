import { Module } from '@nestjs/common';
import { AdminLocalAuthService } from './admin-local-auth.service';
import { AdminLocalAuthController } from './admin-local-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUserService } from '../admin-user/admin-user.service';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminOtpCodeService } from '../admin-otp-code/admin-otp-code.service';
import { AdminOtpCode } from '../admin-otp-code/entities/admin-otp-code.entity';
import { AwsSesService } from 'src/aws-ses/aws-ses.service';
import { Institution } from 'src/institution/entities/institution.entity';
import { InstitutionService } from 'src/institution/institution.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([AdminUser, AdminOtpCode, Institution]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AdminLocalAuthService,
    LocalStrategy,
    JwtStrategy,
    AdminUserService,
    AdminOtpCodeService,
    InstitutionService,
    AwsSesService
  ],
  controllers: [AdminLocalAuthController],
})
export class AdminLocalAuthModule {}
