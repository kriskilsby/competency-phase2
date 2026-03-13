// src/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { Employee } from '../employees/employee.entity';
import { EmploymentHistory } from '../employment-history/employment-history.entity';
import { Qualification } from '../qualifications/qualification.entity';
import { EmployeeProjectExperience } from '../employee-project-experience/employee-project-experience.entity';
import { Cpd } from '../cpd/cpd.entity';
import { ClassificationType } from '../classification-type/classification-type.entity';
import { ClassificationValue } from '../classification-value/classification-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmploymentHistory,
      Qualification,
      EmployeeProjectExperience,
      Cpd,
      ClassificationType,
      ClassificationValue,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
