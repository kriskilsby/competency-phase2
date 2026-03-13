import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeProjectExperienceController } from './employee-project-experience.controller';

describe('EmployeeProjectExperienceController', () => {
  let controller: EmployeeProjectExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeProjectExperienceController],
    }).compile();

    controller = module.get<EmployeeProjectExperienceController>(EmployeeProjectExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
