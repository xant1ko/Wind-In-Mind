import { Injectable } from '@nestjs/common';
import { Task, tasks } from './tempo/test_tasks';

@Injectable()
export class AppService {


  getTasks(): Array<Object> {
    return tasks;
  }

  createTask(taskValue: Task): Task {
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

  resolveTask(taskUid: string): void {
    let needTaskIndex = tasks.findIndex(task=>task.uid === taskUid)
    tasks[needTaskIndex].isDone = !tasks[needTaskIndex].isDone
  } 
}
