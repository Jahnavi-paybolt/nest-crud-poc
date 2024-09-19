// Bootstrap logic is here, like we do in expressJS application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
  });
}
bootstrap();
