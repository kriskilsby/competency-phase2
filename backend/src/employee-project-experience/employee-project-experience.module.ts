import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProjectExperience } from './employee-project-experience.entity';
import { EmployeeProjectExperienceService } from './employee-project-experience.service';
import { EmployeeProjectExperienceController } from './employee-project-experience.controller';
import { ProjectMasterModule } from '../project-master/project-master.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeProjectExperience]),
    ProjectMasterModule,
  ],
  providers: [EmployeeProjectExperienceService],
  controllers: [EmployeeProjectExperienceController],
})
export class EmployeeProjectExperienceModule {}

