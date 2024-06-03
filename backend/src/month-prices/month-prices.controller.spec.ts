import { Test, TestingModule } from '@nestjs/testing';
import { MonthPricesController } from './month-prices.controller';
import { MonthPricesService } from './month-prices.service';

describe('MonthPricesController', () => {
  let controller: MonthPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthPricesController],
      providers: [MonthPricesService],
    }).compile();

    controller = module.get<MonthPricesController>(MonthPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
