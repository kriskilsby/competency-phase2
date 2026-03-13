import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentHistory } from './employment-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentHistory])],
})
export class EmploymentHistoryModule {}
