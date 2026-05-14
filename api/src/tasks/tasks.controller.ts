import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TasksController {
      constructor(private readonly taskService: TasksService) {}

  @Get('/get-list')
  @ApiOperation({ summary: 'Получить все задачи' })
  getAllTasks(): Promise<Object[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/get-filtered-list')
  @ApiOperation({ summary: 'Получить все задачи, разделенные на готовые и нет' })
  getFilteredTasks(): Promise<Object> {
    return this.taskService.getFilteredTasks();
  }

// getFilteredTasks

  @Post('/create')
  @ApiBody({
    type: CreateTaskDto,
    description: 'Данные для создания задачи',
    examples: {
      example1: {
        summary: 'Простая задача',
        value: {
          title:'string',
          description:'string',
          proirity:'firstPlan',
          isDone:false
        }
      },
    }
  })
  @ApiOperation({ summary: 'Создать задачу' })
  createTask(@Body() taskValue : any): any{
    return this.taskService.createTask(taskValue);
  }

  @Post('/resolve/:uid')
  @ApiOperation({ summary: 'Сменить статус выполнения задачи' })
  resolveTask(@Param('uid') taskUid: string): any{
    return this.taskService.resolveTask(taskUid);
  }

  @Post('/delete/:uid')
  @ApiOperation({ summary: 'Удалить задачу' })
  deleteTask(@Param('uid') taskUid: string): any{
    return this.taskService.deleteTask(taskUid);
  }
}
