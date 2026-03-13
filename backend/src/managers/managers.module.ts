import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
})
export class ManagersModule {}
