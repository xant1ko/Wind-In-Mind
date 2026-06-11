import { Body, Controller, Param, Post } from '@nestjs/common';
import { LabelToTaskService } from './label-to-task.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('label-to-task')
export class LabelToTaskController {
  constructor(private readonly labelToTaskService: LabelToTaskService) {}

  @Post('/attach')
  @ApiOperation({ summary: 'Привязать лейбл к задаче' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        taskUid: { type: 'string', example: 'task-uuid-1234' },
        labelUid: { type: 'string', example: 'label-uuid-5678' },
      },
      required: ['taskUid', 'labelUid'],
    },
  })
  attachLabel(
    @Body() { taskUid, labelUid }: { taskUid: string; labelUid: string }
  ): Promise<void> {
    return this.labelToTaskService.attachLabel(taskUid, labelUid);
  }

  @Post('/detach')
  @ApiOperation({ summary: 'Отвязать лейбл от задачи' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        taskUid: { type: 'string', example: 'task-uuid-1234' },
        labelUid: { type: 'string', example: 'label-uuid-5678' },
      },
      required: ['taskUid', 'labelUid'],
    },
  })
  detachLabel(
    @Body() { taskUid, labelUid }: { taskUid: string; labelUid: string }
  ): Promise<void> {
    return this.labelToTaskService.detachLabel(taskUid, labelUid);
  }

  @Post('/detach-all/:taskUid')
  @ApiOperation({ summary: 'Удалить все лейблы с задачи' })
  detachAllLabels(@Param('taskUid') taskUid: string): Promise<void> {
    return this.labelToTaskService.detachAllLabels(taskUid);
  }
}
