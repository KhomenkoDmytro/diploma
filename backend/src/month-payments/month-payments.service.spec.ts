import { Test, TestingModule } from '@nestjs/testing';
import { MonthPaymentsService } from './month-payments.service';

describe('MonthPaymentsService', () => {
  let service: MonthPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthPaymentsService],
    }).compile();

    service = module.get<MonthPaymentsService>(MonthPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
