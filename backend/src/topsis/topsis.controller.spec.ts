import { Test, TestingModule } from '@nestjs/testing';
import { TopsisController } from './topsis.controller';
import { TopsisService } from './topsis.service';

describe('TopsisController', () => {
  let controller: TopsisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopsisController],
      providers: [TopsisService],
    }).compile();

    controller = module.get<TopsisController>(TopsisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
