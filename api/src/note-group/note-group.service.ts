import { Injectable } from '@nestjs/common';
import { NoteGroup } from 'src/tempo/types';
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
}
