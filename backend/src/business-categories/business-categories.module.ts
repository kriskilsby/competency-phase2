import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCategory } from './business-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCategory])],
})
export class BusinessCategoriesModule {}
