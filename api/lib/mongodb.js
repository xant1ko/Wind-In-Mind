import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options = {};

let client;          // Сам клиент MongoDB — через него делаем запросы к базе
let clientPromise;   // Промис — ждём, пока подключение установится

if (!global._mongoClientPromise) {
  
  client = new MongoClient(uri, options);
  
  global._mongoClientPromise = client.connect();
  
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

