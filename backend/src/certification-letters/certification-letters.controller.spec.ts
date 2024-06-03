import { Test, TestingModule } from '@nestjs/testing';
import { CertificationLettersController } from './certification-letters.controller';
import { CertificationLettersService } from './certification-letters.service';

describe('CertificationLettersController', () => {
  let controller: CertificationLettersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificationLettersController],
      providers: [CertificationLettersService],
    }).compile();

    controller = module.get<CertificationLettersController>(CertificationLettersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
