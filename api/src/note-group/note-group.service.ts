import { Injectable } from '@nestjs/common';
import { Note, NoteGroup } from 'src/tempo/types';
import clientPromise from '../../lib/mongodb'


const DB_NAME = 'test'
const COLLECTION_NAME = 'noteGroup'

@Injectable()
export class NoteGroupService {

    async createNoteGroup(noteValue:NoteGroup): Promise<NoteGroup>{

        const client = await clientPromise

        const newNoteGroup: NoteGroup = {
            title:noteValue.title,
            color:noteValue.color,
            uid: crypto.randomUUID()
        }

        await client
            .db(DB_NAME)
            .collection(COLLECTION_NAME)
            .insertOne(newNoteGroup)

        return newNoteGroup
    
    }

    async getAllNoteGroups():Promise<NoteGroup[]>{
        const client = await clientPromise

        const noteGroups = await client
            .db(DB_NAME)
            .collection(COLLECTION_NAME)
            .find({})
            .toArray()

        return noteGroups
    }

    async getNoteGroup(uid:string): Promise<NoteGroup> {
        const client = await clientPromise

const uidString = typeof uid === 'object' 
        ? Object.keys(uid)[0]   // Если объект → берём первый ключ
        : uid;                   // Если строка → используем как есть

        let noteGroup = await client
            .db(DB_NAME)
            .collection(COLLECTION_NAME)
            .findOne({uid: uidString}) as NoteGroup

        if (!noteGroup) {
            throw new Error(`Группа с uid "${uidString}" не найдена`);
        }

        
        const notes = await client
        .db(DB_NAME)
            .collection('notes')
            .find({uid_group: uidString})
            .toArray()
            
        noteGroup.notes = notes    

        return noteGroup
    }

      async deleteNoteGroup(noteGroupUid: string): Promise<void> {
    
        const client = await clientPromise
    
        await client
        .db(DB_NAME)
        .collection(COLLECTION_NAME)
        .deleteOne({uid: noteGroupUid}) as NoteGroup

        return 
      } 
}
