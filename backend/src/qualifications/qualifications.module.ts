import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification } from './qualification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qualification])],
})
export class QualificationsModule {}
