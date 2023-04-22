/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const serverConfig =  config.get('server')

  const PORT = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);

  
    app.enableCors();
  
  await app.listen(PORT);
  logger.log(`App listenin on port ${PORT}`);
}
bootstrap();
