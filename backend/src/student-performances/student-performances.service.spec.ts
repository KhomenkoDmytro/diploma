import { Test, TestingModule } from '@nestjs/testing';
import { StudentPerformancesService } from './student-performances.service';

describe('StudentPerformancesService', () => {
  let service: StudentPerformancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPerformancesService],
    }).compile();

    service = module.get<StudentPerformancesService>(StudentPerformancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
