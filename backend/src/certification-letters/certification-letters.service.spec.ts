import { Test, TestingModule } from '@nestjs/testing';
import { CertificationLettersService } from './certification-letters.service';

describe('CertificationLettersService', () => {
  let service: CertificationLettersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificationLettersService],
    }).compile();

    service = module.get<CertificationLettersService>(CertificationLettersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
