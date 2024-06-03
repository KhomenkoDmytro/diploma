import { Test, TestingModule } from '@nestjs/testing';
import { SubjectAssignmentsController } from './subject-assignments.controller';
import { SubjectAssignmentsService } from './subject-assignments.service';

describe('SubjectAssignmentsController', () => {
  let controller: SubjectAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectAssignmentsController],
      providers: [SubjectAssignmentsService],
    }).compile();

    controller = module.get<SubjectAssignmentsController>(SubjectAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
