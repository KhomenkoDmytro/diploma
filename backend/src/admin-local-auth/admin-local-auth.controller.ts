import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/admin-local-auth-payload.dto';
import { AdminLocalAuthService } from './admin-local-auth.service';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';
import { AdminChangePasswordDto } from './dto/admin-change-password.dto';
import { AdminRecoverPasswordDto } from './dto/admin-recover-password.dto';
import { AdminGenerateOtpDto } from './dto/admin-generate-otp.dto';
import { AdminVerifyEmailDto } from './dto/admin-verify-email.dto';
import { AdminChangeEmailDto } from './dto/admin-change-email.dto';

@ApiTags('local-auth')
@Controller('admin-local-auth')
export class AdminLocalAuthController {
  constructor(private readonly authService: AdminLocalAuthService) {}

  @ApiOperation({ summary: 'Email+password auth' })
  @ApiBody({ type: AuthPayloadDto })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Sign up' })
  @Post('sign-up')
  async signUp(@Body() signUpPayload: AdminSignUpDto) {
    return this.authService.registrateUser(signUpPayload);
  }

  @ApiOperation({ summary: 'Change password' })
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: AdminChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @ApiOperation({ summary: 'Generate OTP code to recover password' })
  @Put('generate-otp-code')
  async generateOTP(@Body() adminGenerateOtpDto: AdminGenerateOtpDto) {
    return this.authService.createOtpForUser(adminGenerateOtpDto);
  }

  @ApiOperation({ summary: 'Recover password (forget password) ' })
  @Put('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: AdminRecoverPasswordDto) {
    return this.authService.recoverPassword(recoverPasswordDto);
  }

  @ApiOperation({ summary: 'Verification of account' })
  @Put('verify-email')
  async verifyEmail(@Body() verifyEmailDto: AdminVerifyEmailDto) {
    return this.authService.verifyUser(verifyEmailDto);
  }

  @ApiOperation({ summary: 'Change email' })
  @Put('change-email')
  async changeEmail(@Body() changeEmailDto:AdminChangeEmailDto){
    return this.authService.changeEmail(changeEmailDto)
  }
}
