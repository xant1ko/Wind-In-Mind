import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
const app = await NestFactory.create(AppModule);

const swaggerConfig = new DocumentBuilder()
  .setTitle('Wind In Mind API')
  .build()

  const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig)

SwaggerModule.setup('/api/docs', app, swaggerDocument)

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
