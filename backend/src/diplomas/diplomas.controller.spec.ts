import { Test, TestingModule } from '@nestjs/testing';
import { DiplomasController } from './diplomas.controller';
import { DiplomasService } from './diplomas.service';

describe('DiplomasController', () => {
  let controller: DiplomasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiplomasController],
      providers: [DiplomasService],
    }).compile();

    controller = module.get<DiplomasController>(DiplomasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
