import { Test, TestingModule } from '@nestjs/testing';
import { AdminGoogleOauthController } from './admin-google-oauth.controller';

describe('AdminGoogleOauthController', () => {
  let controller: AdminGoogleOauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminGoogleOauthController],
    }).compile();

    controller = module.get<AdminGoogleOauthController>(AdminGoogleOauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
