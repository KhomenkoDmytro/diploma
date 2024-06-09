import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthPayloadDto } from "./dto/admin-local-auth-payload.dto";
import { JwtService } from "@nestjs/jwt";
import { AdminUser } from "../admin-user/entities/admin-user.entity";
import { EntityManager } from "typeorm";
import { AdminUserService } from "../admin-user/admin-user.service";
import { AdminSignUpDto } from "./dto/admin-sign-up.dto";
import { AdminChangePasswordDto } from "./dto/admin-change-password.dto";
import { AdminGenerateOtpDto } from "./dto/admin-generate-otp.dto";
import { AdminRecoverPasswordDto } from "./dto/admin-recover-password.dto";
import { AdminVerifyEmailDto } from "./dto/admin-verify-email.dto";
import { AdminChangeEmailDto } from "./dto/admin-change-email.dto";
import { AdminOtpCodeService } from "../admin-otp-code/admin-otp-code.service";
import { OtpStatus } from "../helpers/enums/otp-status.enum";
import { OtpType } from "../helpers/enums/otp-type.enum";
import { validateGetById } from "../helpers/validateGetById";
import { AwsSesService } from "src/aws-ses/aws-ses.service";
import { Institution } from "src/institution/entities/institution.entity";
import { InstitutionService } from "src/institution/institution.service";

@Injectable()
export class AdminLocalAuthService {
  constructor(
    private entityManager: EntityManager,
    private jwtService: JwtService,
    private readonly userService: AdminUserService,
    private readonly otpCodeService: AdminOtpCodeService,
    private readonly awsSesService: AwsSesService,
    private readonly institutionService: InstitutionService,
  ) {}

  generateOTPcode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async validateUser(localAuthPayloadDto: AuthPayloadDto) {
    try {
      const findUser = await this.entityManager.findOne(AdminUser, {
        where: {
          email: localAuthPayloadDto.email,
        },
        relations: ["institution"],
      });

      if (!findUser) {
        throw new HttpException(
          `User with email ${localAuthPayloadDto.email} is not found`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isValidPassword = await this.userService.checkPassword(
        localAuthPayloadDto.password,
        findUser.password,
      );

      if (!isValidPassword) {
        throw new HttpException(`Invalid password`, HttpStatus.UNAUTHORIZED);
      }

      const { password, institution, ...user } = findUser;
      return this.jwtService.sign({ user, institution_id: institution?.id });
    } catch (error) {
      throw error;
    }
  }

  async registrateUser(signUpPayloadDto: AdminSignUpDto) {
    try {
      const user = await this.userService.create({
        email: signUpPayloadDto.email,
        password: signUpPayloadDto.password,
        firstName: signUpPayloadDto.firstName,
        lastName: signUpPayloadDto.lastName,
        patronymic: signUpPayloadDto.patronymic
      });
  
      const otpCode = this.generateOTPcode();
      await this.otpCodeService.create({
        value: otpCode,
        type: OtpType.VERIFY_ACCOUNT,
        expiration_minutes: 5,
        user_id: user.id,
      });
  
      let institution = await this.entityManager.findOne(Institution, {
        where: {
          name: signUpPayloadDto.schoolName,
          accessKey: signUpPayloadDto.accessKey,
        },
      });
  
      if (institution) {
        await this.institutionService.addUserToInstitution(user.id, institution.id);
      } else {
        institution = await this.institutionService.create({
          name: signUpPayloadDto.schoolName,
          accessKey: signUpPayloadDto.accessKey,
          address: signUpPayloadDto.schoolAddress,
          adminUserId: user.id,
        });
      }
  
      const { password, ...tokenData } = user;
      const token = this.jwtService.sign({
        tokenData,
        institution_id: institution?.id,
      });
  
      this.awsSesService.sendMail({
        sourceEmail: "gitlab@vepbit.com",
        toAddressEmail: signUpPayloadDto.email,
        otpCode,
      });
  
      return token;
    } catch (error) {
      throw error;
    }
  }
  

  async verifyUser(verifyEmailDto: AdminVerifyEmailDto) {
    try {
      const user = await this.entityManager.findOne(AdminUser, {
        where: { email: verifyEmailDto.email },
        relations: { otps: true },
      });
      if (!user) {
        throw new HttpException(
          `User with email ${verifyEmailDto.email} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const otp = user.otps.find(
        (otp) =>
          otp.type === OtpType.VERIFY_ACCOUNT &&
          otp.status === OtpStatus.UNUSED,
      );

      if (!otp) {
        throw new HttpException(`No OTP generated`, HttpStatus.BAD_REQUEST);
      } else if (otp.value !== verifyEmailDto.otp) {
        throw new HttpException(`Invalid OTP`, HttpStatus.BAD_REQUEST);
      }

      this.otpCodeService.update(otp.id, { ...otp, status: OtpStatus.USED });
      const updateAdminUserDto = { ...user, isVerified: true };
      await this.userService.update(user.id, updateAdminUserDto);
      return {
        status: "success",
        message: "User verified successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async recoverPassword(recoverPasswordDto: AdminRecoverPasswordDto) {
    try {
      const user = await this.entityManager.findOne(AdminUser, {
        where: { email: recoverPasswordDto.email },
        relations: { otps: true },
      });
      if (!user) {
        throw new HttpException(
          `User with email ${recoverPasswordDto.email} is not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const otp = user.otps.find(
        (otp) =>
          otp.type === OtpType.RESET_PASSWORD &&
          otp.status === OtpStatus.UNUSED,
      );
      if (!otp) {
        throw new HttpException(
          `OTP code is not generated`,
          HttpStatus.BAD_REQUEST,
        );
      } else if (otp.value !== recoverPasswordDto.otp) {
        throw new HttpException(`Invalid OTP`, HttpStatus.BAD_REQUEST);
      }

      const updateAdminUserDto = {
        ...user,
        isVerified: true,
        password: recoverPasswordDto.new_password,
      };
      this.otpCodeService.update(otp.id, { ...otp, status: OtpStatus.USED });
      await this.userService.update(user.id, updateAdminUserDto);
      return {
        status: "success",
        message: "Password changed",
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(changePasswordDto: AdminChangePasswordDto) {
    try {
      const user = await this.entityManager.findOne(AdminUser, {
        where: {
          email: changePasswordDto.email,
        },
      });

      if (!user) {
        throw new HttpException(
          `User with email ${changePasswordDto.email} is not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const isValidPassword = await this.userService.checkPassword(
        changePasswordDto.old_password,
        user.password,
      );

      if (!isValidPassword) {
        throw new HttpException(`Invalid password`, HttpStatus.UNAUTHORIZED);
      }

      const updateAdminUserDto = {
        ...user,
        password: changePasswordDto.new_password,
      };

      await this.userService.update(user.id, updateAdminUserDto);
      return {
        status: "success",
        message: "Password changed",
      };
    } catch (error) {
      throw error;
    }
  }

  async createOtpForUser(adminGenerateOtpDto: AdminGenerateOtpDto) {
    try {
      const user = await this.entityManager.findOne(AdminUser, {
        where: { email: adminGenerateOtpDto.email },
      });

      if (!user) {
        throw new HttpException(
          `User with email ${adminGenerateOtpDto.email} is not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const createOtpCodeOtp = {
        value: this.generateOTPcode(),
        expiration_minutes: 5,
        type: adminGenerateOtpDto.type,
        user_id: user.id,
      };
      await this.otpCodeService.create(createOtpCodeOtp);
      return {
        status: "success",
        message: "OTP code sent to your email",
      };
    } catch (error) {
      throw error;
    }
  }

  async changeEmail(changeEmailDto: AdminChangeEmailDto) {
    const user = await this.entityManager.findOne(AdminUser, {
      where: { email: changeEmailDto.email },
    });
    if (!user) {
      throw new HttpException(
        `User with email ${changeEmailDto.email} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const isValidPassword = await this.userService.checkPassword(
      changeEmailDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new HttpException(`Invalid password`, HttpStatus.UNAUTHORIZED);
    }
    const updateAdminUserDto = {
      ...user,
      email: changeEmailDto.new_email,
    };

    await this.otpCodeService.create({
      value: this.generateOTPcode(),
      type: OtpType.VERIFY_ACCOUNT,
      expiration_minutes: 5,
      user_id: user.id,
    });
    await this.userService.update(user.id, {
      ...updateAdminUserDto,
      isVerified: false,
    });
    return {
      status: "success",
      message: "Сonfirm new email address by otp.",
    };
  }
}
