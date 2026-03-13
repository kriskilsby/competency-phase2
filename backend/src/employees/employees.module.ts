// backend/src/employees/employees.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { Employee } from './employee.entity';
import { EmploymentHistory } from '../employment-history/employment-history.entity';
import { Qualification } from '../qualifications/qualification.entity';
import { EmployeeProjectExperience } from '../employee-project-experience/employee-project-experience.entity';
import { Cpd } from '../cpd/cpd.entity';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmploymentHistory,
      Qualification,
      EmployeeProjectExperience,
      Cpd,
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
