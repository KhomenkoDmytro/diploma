import { Test, TestingModule } from '@nestjs/testing';
import { AdminLocalAuthController } from './admin-local-auth.controller';

describe('AdminLocalAuthController', () => {
  let controller: AdminLocalAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminLocalAuthController],
    }).compile();

    controller = module.get<AdminLocalAuthController>(AdminLocalAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
