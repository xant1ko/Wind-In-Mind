import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {clientPromise } from '../lib/mongodb.js'

const checkConnectTodataBase = new Promise((_,reject)=>{
  try {
    const client =  clientPromise
    const ping =  client.db().admin().ping()

    return "Подключение к МонгоДб прошло успешно!" + ping


  } catch (error) {
    reject( new Error('Не удалосбь подключиться к бд, ' + error)) 
  }
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


const swaggerConfig = new DocumentBuilder()
.setTitle('Wind In Mind API')
.build()

const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig)

SwaggerModule.setup('/api/docs', app, swaggerDocument)

await app.listen(process.env.PORT ?? 8000);
}

let debounceTimer

let secondsConnecting = 0


async function mountApp() {
  function logWithConnectToDb() {
  debounceTimer = setInterval(()=>{
  console.log(`Выполняется подключение к базе данных: ${secondsConnecting} секунд...`);
  secondsConnecting++
  },1000)
  }
  
  try {
   await checkConnectTodataBase
   await logWithConnectToDb()
    await console.log('ГОЙДА!!!');
    await bootstrap();
  } catch {
    await console.error('Не удалось подключииться к базе данных!');

  } finally {
    await clearInterval(debounceTimer)
    secondsConnecting = 0
  }

}

mountApp()
