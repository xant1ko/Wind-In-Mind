import { Injectable } from '@nestjs/common';
import clientPromise from '../../lib/mongodb'
import { Task, Label } from 'src/tempo/types';

const DB_NAME = 'test'
const COLLECTION_NAME = 'tasks'
const LABELS_COLLECTION = 'labels'

@Injectable()
export class TasksService {

  private async enrichTasksWithLabels(tasks: any[]): Promise<Task[]> {
    if (!tasks || tasks.length === 0) return [];

    const client = await clientPromise;
    const labels = await client
      .db(DB_NAME)
      .collection(LABELS_COLLECTION)
      .find({})
      .toArray() as Label[];

    const labelMap = new Map(labels.map(l => [l.uid, l]));

    return tasks.map(task => ({
      ...task,
      labels: (task.labels || [])
        .map((labelUid: string) => labelMap.get(labelUid))
        .filter((label: Label | undefined) => label !== undefined),
    }));
  }

  async getAllTasks(): Promise<Task[]> {
    const client = await clientPromise
    const tasks = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    return this.enrichTasksWithLabels(tasks)
  }

  async getFilteredTasks(): Promise<Object> {
    const client = await clientPromise
    const tasks = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()

    const enrichedTasks = await this.enrichTasksWithLabels(tasks);

    const filteredTasks = {
      unDone: [
        ...enrichedTasks.filter(el=>(!el.isDone && el.priority == 'firstPlan')),
        ...enrichedTasks.filter(el=>(!el.isDone && el.priority == 'secondplan')),
        ...enrichedTasks.filter(el=>(!el.isDone && el.priority == 'longDistance')),
      ],
      done: enrichedTasks.filter(el=>!!el.isDone)
    }
    return filteredTasks
  }

  async createTask(taskValue: Task): Promise<Task> {
    const client = await clientPromise

    const newTask: Task = {
      title:taskValue.title,
      description: taskValue.description,
      dateCompleted: taskValue.dateCompleted,
      priority:taskValue.priority,
      uid: crypto.randomUUID(),
      labels: [],
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
