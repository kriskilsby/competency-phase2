import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMaster } from './project-master.entity';
import { ProjectMasterService } from './project-master.service';
import { ProjectMasterController } from './project-master.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMaster])],
  providers: [ProjectMasterService],
  controllers: [ProjectMasterController],
  exports: [TypeOrmModule],
})
export class ProjectMasterModule {}

