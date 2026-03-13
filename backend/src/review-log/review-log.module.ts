import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewLog } from './review-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLog])],
})
export class ReviewLogModule {}
