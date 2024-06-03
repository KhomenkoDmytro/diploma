import { Test, TestingModule } from '@nestjs/testing';
import { DecreesService } from './decrees.service';

describe('DecreesService', () => {
  let service: DecreesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecreesService],
    }).compile();

    service = module.get<DecreesService>(DecreesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
