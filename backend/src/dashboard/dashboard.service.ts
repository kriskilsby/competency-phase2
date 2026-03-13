// src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

import { Employee } from '../employees/employee.entity';
import { EmploymentHistory } from '../employment-history/employment-history.entity';
import { Qualification } from '../qualifications/qualification.entity';
import { EmployeeProjectExperience } from '../employee-project-experience/employee-project-experience.entity';
import { Cpd } from '../cpd/cpd.entity';
import { ClassificationType } from '../classification-type/classification-type.entity';
import { ClassificationValue } from '../classification-value/classification-value.entity';

export interface DashboardCount {
  total: number;
  approved: number;
}

export interface SkillVolume {
  cv_id: number;
  skill: string;
  type: string;
  volume: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(EmploymentHistory)
    private readonly ehRepo: Repository<EmploymentHistory>,

    @InjectRepository(Qualification)
    private readonly qualRepo: Repository<Qualification>,

    @InjectRepository(EmployeeProjectExperience)
    private readonly projRepo: Repository<EmployeeProjectExperience>,

    @InjectRepository(Cpd)
    private readonly cpdRepo: Repository<Cpd>,

    @InjectRepository(ClassificationType)
    private readonly ctRepo: Repository<ClassificationType>,

    @InjectRepository(ClassificationValue)
    private readonly cvRepo: Repository<ClassificationValue>,

    private dataSource: DataSource,
  ) {}

  private async getCounts(
    repo: Repository<any>,
    alias: string,
    activeColumn: string,
    employeeColumn: string,
    employeeReviewColumn: string,
    managerReviewColumn: string,
  ): Promise<DashboardCount> {
    const totalQuery = repo
      .createQueryBuilder(alias)
      .select(`COUNT(DISTINCT ${alias}.${employeeColumn})`, 'count')
      .where(`${alias}.${activeColumn} = true`);

    const approvedQuery = repo
      .createQueryBuilder(alias)
      .select(`COUNT(DISTINCT ${alias}.${employeeColumn})`, 'count')
      .where(`${alias}.${activeColumn} = true`)
      .andWhere(
        `${alias}.${managerReviewColumn} > ${alias}.${employeeReviewColumn}`,
      );

    const [totalResult, approvedResult] = await Promise.all([
      totalQuery.getRawOne() as Promise<{ count: string }>,
      approvedQuery.getRawOne() as Promise<{ count: string }>,
    ]);

    return {
      total: Number(totalResult?.count ?? 0),
      approved: Number(approvedResult?.count ?? 0),
    };
  }

  // NEW: employees fully approved across all tables
  private async getFullyApprovedEmployees(): Promise<number> {
    const result: { count: string }[] = await this.employeeRepo.query(`
      SELECT COUNT(DISTINCT e_id) AS count
      FROM (
        SELECT e_id
        FROM competency_data.employment_history
        WHERE eh_active = true
        AND eh_mreview > eh_ereview

        INTERSECT

        SELECT e_id
        FROM competency_data.qualifications
        WHERE q_active = true
        AND q_mreview > q_ereview

        INTERSECT

        SELECT e_id
        FROM competency_data.employee_project_experience
        WHERE epe_active = true
        AND epe_manager_reviewed_at > epe_employee_reviewed_at

        INTERSECT

        SELECT e_id
        FROM competency_data.cpd
        WHERE cpd_active = true
        AND cpd_mreview > cpd_ereview
      ) approved_employees
    `);

    return Number(result?.[0]?.count ?? 0);
  }

  async getSummary() {
    const [
      employeeTotal,
      employeeApproved,
      employmentHistory,
      qualifications,
      projectExperience,
      cpd,
    ] = await Promise.all([
      // total employees
      this.employeeRepo
        .createQueryBuilder('e')
        .select('COUNT(DISTINCT e.e_id)', 'count')
        .where('e.e_active = true')
        .getRawOne() as Promise<{ count: string }>,

      // fully approved employees
      this.getFullyApprovedEmployees(),

      // other tiles (unchanged)
      this.getCounts(
        this.ehRepo,
        'eh',
        'eh_active',
        'e_id',
        'eh_ereview',
        'eh_mreview',
      ),

      this.getCounts(
        this.qualRepo,
        'q',
        'q_active',
        'e_id',
        'q_ereview',
        'q_mreview',
      ),

      this.getCounts(
        this.projRepo,
        'epe',
        'epe_active',
        'e_id',
        'epe_employee_reviewed_at',
        'epe_manager_reviewed_at',
      ),

      this.getCounts(
        this.cpdRepo,
        'cpd',
        'cpd_active',
        'e_id',
        'cpd_ereview',
        'cpd_mreview',
      ),
    ]);

    return {
      employees: {
        total: Number(employeeTotal.count),
        approved: employeeApproved,
      },
      employmentHistory,
      qualifications,
      projectExperience,
      cpd,
    };
  }

  async getSkillVolumes(): Promise<SkillVolume[]> {
    const query = `
      SELECT
        ps.ps_name AS sector,
        cv.cv_id,
        cv.type_name AS skill,
        COUNT(ece.epe_id) AS usage_volume
      FROM competency_data.experience_classification ece

      JOIN competency_data.employee_project_experience epe
        ON epe.epe_id = ece.epe_id

      JOIN competency_data.primary_sector ps
        ON ps.ps_id = epe.ps_id

      JOIN competency_data.classification_value cv
        ON cv.cv_id = ece.cv_id

      JOIN competency_data.classification_type ct
        ON ct.ct_id = cv.ct_id

      WHERE epe.epe_active = true

      GROUP BY
        ps.ps_name,
        cv.cv_id,
        cv.type_name

      ORDER BY
        ps.ps_name,
        usage_volume DESC;
    `;

    return this.dataSource.query(query);
  }
}
