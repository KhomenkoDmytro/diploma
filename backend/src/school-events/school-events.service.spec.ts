import { Test, TestingModule } from '@nestjs/testing';
import { SchoolEventsService } from './school-events.service';

describe('SchoolEventsService', () => {
  let service: SchoolEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolEventsService],
    }).compile();

    service = module.get<SchoolEventsService>(SchoolEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
