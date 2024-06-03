import { Test, TestingModule } from '@nestjs/testing';
import { AdminGoogleOauthService } from './admin-google-oauth.service';

describe('AdminGoogleOauthService', () => {
  let service: AdminGoogleOauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGoogleOauthService],
    }).compile();

    service = module.get<AdminGoogleOauthService>(AdminGoogleOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
