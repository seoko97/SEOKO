import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  app.use(cookieParser());
  app.use(compression());

  await app.listen(3065);
}
bootstrap();
