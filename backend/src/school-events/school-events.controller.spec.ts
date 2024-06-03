import { Test, TestingModule } from '@nestjs/testing';
import { SchoolEventsController } from './school-events.controller';
import { SchoolEventsService } from './school-events.service';

describe('SchoolEventsController', () => {
  let controller: SchoolEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolEventsController],
      providers: [SchoolEventsService],
    }).compile();

    controller = module.get<SchoolEventsController>(SchoolEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
