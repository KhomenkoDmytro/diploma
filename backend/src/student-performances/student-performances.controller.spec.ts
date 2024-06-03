import { Test, TestingModule } from '@nestjs/testing';
import { StudentPerformancesController } from './student-performances.controller';
import { StudentPerformancesService } from './student-performances.service';

describe('StudentPerformancesController', () => {
  let controller: StudentPerformancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPerformancesController],
      providers: [StudentPerformancesService],
    }).compile();

    controller = module.get<StudentPerformancesController>(StudentPerformancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
