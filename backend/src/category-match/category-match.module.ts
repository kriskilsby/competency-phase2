import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryMatch } from './category-match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryMatch])],
})
export class CategoryMatchModule {}
