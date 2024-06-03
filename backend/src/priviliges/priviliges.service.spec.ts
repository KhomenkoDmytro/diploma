import { Test, TestingModule } from '@nestjs/testing';
import { PriviligesService } from './priviliges.service';

describe('PriviligesService', () => {
  let service: PriviligesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriviligesService],
    }).compile();

    service = module.get<PriviligesService>(PriviligesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
