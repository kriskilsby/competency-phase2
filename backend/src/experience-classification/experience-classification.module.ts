import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceClassification } from './experience-classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceClassification])],
  exports: [TypeOrmModule],
})
export class ExperienceClassificationModule {}
