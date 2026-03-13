import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  // You can add controllers/services here later
})
export class DisciplinesModule {}
