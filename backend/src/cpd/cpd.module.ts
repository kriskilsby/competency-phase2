import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cpd } from './cpd.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cpd])],
})
export class CpdModule {}
