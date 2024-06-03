import { Module } from '@nestjs/common';
import { AdminGoogleOauthController } from './admin-google-oauth.controller';
import { AdminGoogleOauthService } from './admin-google-oauth.service';
import { GoogleStrategy } from './utils/google-strategy';
import { PassportModule } from '@nestjs/passport';
import { AdminUserService } from '../admin-user/admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../admin-user/entities/admin-user.entity';
import { Institution } from 'src/institution/entities/institution.entity';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }), TypeOrmModule.forFeature([AdminUser, Institution])],
  controllers: [AdminGoogleOauthController],
  providers: [GoogleStrategy, AdminGoogleOauthService, AdminUserService],
  exports: [AdminGoogleOauthService],
})
export class AdminGoogleOauthModule {}
