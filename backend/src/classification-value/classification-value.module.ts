import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationValue } from './classification-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificationValue])],
  exports: [TypeOrmModule],
})
export class ClassificationValueModule {}
