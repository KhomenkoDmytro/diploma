import { Test, TestingModule } from '@nestjs/testing';
import { MonthPaymentsController } from './month-payments.controller';
import { MonthPaymentsService } from './month-payments.service';

describe('MonthPaymentsController', () => {
  let controller: MonthPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthPaymentsController],
      providers: [MonthPaymentsService],
    }).compile();

    controller = module.get<MonthPaymentsController>(MonthPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
