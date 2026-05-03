import { Injectable } from '@nestjs/common';
import clientPromise from '../../lib/mongodb'
import { Note, Task } from 'src/tempo/types';

const DB_NAME = 'test'
const COLLECTION_NAME = 'notes'

@Injectable()
export class NotesService {


  async getNotes(): Promise<Object[]> {
    const client = await clientPromise
    const notes = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    return notes
  }
  async createNote(noteValue: Note): Promise<Note> {
    const client = await clientPromise

    const newNote: Note = {
      title:noteValue.title,
      description: noteValue.description,
      uid: crypto.randomUUID(),
      createdDate: new Date(),
    }

    await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .insertOne(newNote)
    return newNote
  } 

  async deleteNote(noteUid: string): Promise<void> {

    const client = await clientPromise

    await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .deleteOne({uid: noteUid}) as Task

    return 
  } 


}
