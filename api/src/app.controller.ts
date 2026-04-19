import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-list')
  getTasks(): Array<Object> {
    return this.appService.getTasks();
  }

  @Post('/create')
  createTask(@Body() taskValue : any): any{
    return this.appService.createTask(taskValue);
  }
}
