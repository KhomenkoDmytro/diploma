import { Test, TestingModule } from '@nestjs/testing';
import { AdminLocalAuthService } from './admin-local-auth.service';

describe('AdminLocalAuthService', () => {
  let service: AdminLocalAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminLocalAuthService],
    }).compile();

    service = module.get<AdminLocalAuthService>(AdminLocalAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
