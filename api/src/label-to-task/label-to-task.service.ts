import { Injectable } from '@nestjs/common';
import clientPromise from '../../lib/mongodb';

const DB_NAME = 'test';
const COLLECTION_NAME = 'tasks';

@Injectable()
export class LabelToTaskService {
  async attachLabel(taskUid: string, labelUid: string): Promise<void> {
    const client = await clientPromise;

    await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { uid: taskUid },
        { $addToSet: { labels: labelUid } }
      );
  }

  async detachLabel(taskUid: string, labelUid: string): Promise<void> {
    const client = await clientPromise;

    await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { uid: taskUid },
        { $pull: { labels: labelUid } }
      );
  }

  async detachAllLabels(taskUid: string): Promise<void> {
    const client = await clientPromise;

    await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { uid: taskUid },
        { $set: { labels: [] } }
      );
  }
}
