import { Injectable } from '@nestjs/common';
import clientPromise from '../../lib/mongodb'
import { Task } from 'src/tempo/types';

const DB_NAME = 'test'
const COLLECTION_NAME = 'tasks'

@Injectable()
export class TasksService {


  async getTasks(): Promise<Object[]> {
    const client = await clientPromise
    const tasks = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    return tasks
  }

  async createTask(taskValue: Task): Promise<Task> {
    const client = await clientPromise

    const newTask: Task = {
      title:taskValue.title,
      description: taskValue.description,
      dateCompleted: taskValue.dateCompleted,
      priority:taskValue.priority,
      uid: crypto.randomUUID(),
      createdDate: new Date().toLocaleTimeString(), 
    }

    await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .insertOne(newTask)
    return newTask
  } 

  async resolveTask(taskUid: string): Promise<void> {

    const client = await clientPromise

    const task = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .findOne({uid: taskUid}) as Task

    if (!task) {
      throw new Error(`Задача не найдена.${task}`);
    }

    await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .updateOne({uid:taskUid},
      {$set: {isDone: !task.isDone }}
    )
    
    return
  }

  async deleteTask(taskUid: string): Promise<void> {

    const client = await clientPromise

    await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .deleteOne({uid: taskUid}) as Task

    return 
  } 


}
