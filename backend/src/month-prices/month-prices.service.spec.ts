import { Test, TestingModule } from '@nestjs/testing';
import { MonthPricesService } from './month-prices.service';

describe('MonthPricesService', () => {
  let service: MonthPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthPricesService],
    }).compile();

    service = module.get<MonthPricesService>(MonthPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
