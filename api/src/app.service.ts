import { Injectable } from '@nestjs/common';
import { Task, tasks } from './tempo/test_tasks';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  getTasks(): Array<Object> {
    return tasks;
  }

  createTask(taskValue: Task): any {
    const newTask: Task = {
      title:taskValue.title,
      description: taskValue.description,
      dateCompleted: taskValue.dateCompleted,
      priority:taskValue.priority,
      uid: crypto.randomUUID(),
      createdDate: new Date().toLocaleTimeString(), 
    }
    tasks.push(newTask)
    return newTask
  } 
}
