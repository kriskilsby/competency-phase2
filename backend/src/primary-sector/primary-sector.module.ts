import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimarySector } from './primary-sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrimarySector])],
  exports: [TypeOrmModule],
})
export class PrimarySectorModule {}
