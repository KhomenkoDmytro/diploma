import { Test, TestingModule } from '@nestjs/testing';
import { AdminOtpCodeController } from './admin-otp-code.controller';
import { AdminOtpCodeService } from './admin-otp-code.service';

describe('AdminOtpCodeController', () => {
  let controller: AdminOtpCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOtpCodeController],
      providers: [AdminOtpCodeService],
    }).compile();

    controller = module.get<AdminOtpCodeController>(AdminOtpCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
