import { Test, TestingModule } from '@nestjs/testing';
import { SubjectAssignmentsService } from './subject-assignments.service';

describe('SubjectAssignmentsService', () => {
  let service: SubjectAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectAssignmentsService],
    }).compile();

    service = module.get<SubjectAssignmentsService>(SubjectAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
