import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalEntity } from './legal-entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LegalEntity])],
})
export class LegalEntitiesModule {}
