import { Injectable } from '@nestjs/common';
import { Label } from 'src/tempo/types';
import clientPromise from '../../lib/mongodb'

const DB_NAME = 'test'
const COLLECTION_NAME = 'label'

@Injectable()
export class LabelService {

    async createLabel(labelBody:Label): Promise<{detail:string, body:Label}>{
    
            const client = await clientPromise
    
            const newLabel: Label = {
                ...labelBody,
                uid: crypto.randomUUID()
            }
    
            await client
                .db(DB_NAME)
                .collection(COLLECTION_NAME)
                .insertOne(newLabel)
    
            return {
                detail: 'Успешное создание лейбла!',
                body: newLabel
            }
        }
    
        async getAllLabels():Promise<Label[]>{
            const client = await clientPromise
    
            const labels = await client
                .db(DB_NAME)
                .collection(COLLECTION_NAME)
                .find({})
                .toArray()
    
            return labels
        }
    
        async getLabelByUid(uid:string): Promise<Label> {
            const client = await clientPromise
    
    const uidString = typeof uid === 'object' 
            ? Object.keys(uid)[0]   // Если объект → берём первый ключ
            : uid;                   // Если строка → используем как есть
    
            let label = await client
                .db(DB_NAME)
                .collection(COLLECTION_NAME)
                .findOne({uid: uidString}) as Label
    
            if (!label) {
                throw new Error(`Label с uid "${uidString}" не найден`);
            }    
            return label
        }
    
          async deleteLabel(labelUid: string): Promise<string> {
        
            const client = await clientPromise
        
            await client
            .db(DB_NAME)
            .collection(COLLECTION_NAME)
            .deleteOne({uid: labelUid})
    
            return 'success'
          } 
}
