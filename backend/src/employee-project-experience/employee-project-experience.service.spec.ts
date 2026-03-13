import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeProjectExperienceService } from './employee-project-experience.service';

describe('EmployeeProjectExperienceService', () => {
  let service: EmployeeProjectExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeProjectExperienceService],
    }).compile();

    service = module.get<EmployeeProjectExperienceService>(EmployeeProjectExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
