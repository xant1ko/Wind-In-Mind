import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import clientPromise from '../lib/mongodb.js'

const checkConnectTodataBase = async ()=>{
  try {
    const client = await clientPromise
    await client.db('test').command({ ping: 1 })
    console.log("Подключение к МонгоДб прошло успешно!")

  } catch (error) {
    throw new Error('Не удалось подключиться к бд, ' + error) 
  }
}

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


function logWithConnectToDb() {
debounceTimer = setInterval(()=>{
console.log(`Выполняется подключение к базе данных: ${secondsConnecting} секунд...`);
secondsConnecting++
},1000)
}
async function mountApp() {
  try {    
    await logWithConnectToDb()
    await checkConnectTodataBase() 
    
  await console.log('ГОЙДА!!!');
    await bootstrap();
  } catch (error) {
    // await console.error('Не удалось подключиться к базе данных!');
    await console.error(error);

  } finally {    
    await clearInterval(debounceTimer)
    secondsConnecting = 0
  }

}

mountApp()
