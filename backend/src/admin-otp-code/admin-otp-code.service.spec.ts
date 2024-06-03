import { Test, TestingModule } from '@nestjs/testing';
import { AdminOtpCodeService } from './admin-otp-code.service';

describe('AdminOtpCodeService', () => {
  let service: AdminOtpCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminOtpCodeService],
    }).compile();

    service = module.get<AdminOtpCodeService>(AdminOtpCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
