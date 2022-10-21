import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule
} from '@nestjs/swagger';
import {
  APP_CONTAINER_NAME,
  APP_VERSION,
  APP_VERSION_PREFIX
} from './app.vars';

export const enableSwagger = (app: INestApplication, path = 'api') => {
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(APP_CONTAINER_NAME)
    .setDescription('This is our API')
    .setVersion(`${APP_VERSION_PREFIX}.${APP_VERSION}`)
    .setContact('Luan Verdelho', '', 'luanverdelho642@gmail.com')
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions
  );

  SwaggerModule.setup(path, app, swaggerDocument);
};
