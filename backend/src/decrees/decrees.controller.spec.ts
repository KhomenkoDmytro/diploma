import { Test, TestingModule } from '@nestjs/testing';
import { DecreesController } from './decrees.controller';
import { DecreesService } from './decrees.service';

describe('DecreesController', () => {
  let controller: DecreesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecreesController],
      providers: [DecreesService],
    }).compile();

    controller = module.get<DecreesController>(DecreesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
