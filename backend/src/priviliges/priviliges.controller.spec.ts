import { Test, TestingModule } from '@nestjs/testing';
import { PriviligesController } from './priviliges.controller';
import { PriviligesService } from './priviliges.service';

describe('PriviligesController', () => {
  let controller: PriviligesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriviligesController],
      providers: [PriviligesService],
    }).compile();

    controller = module.get<PriviligesController>(PriviligesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
