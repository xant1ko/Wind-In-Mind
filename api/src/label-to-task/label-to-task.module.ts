import { Module } from '@nestjs/common';
import { LabelToTaskController } from './label-to-task.controller';
import { LabelToTaskService } from './label-to-task.service';

@Module({
  controllers: [LabelToTaskController],
  providers: [LabelToTaskService],
})
export class LabelToTaskModule {}
