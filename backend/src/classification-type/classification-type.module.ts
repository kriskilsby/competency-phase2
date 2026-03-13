import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationType } from './classification-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificationType])],
  exports: [TypeOrmModule],
})
export class ClassificationTypeModule {}
