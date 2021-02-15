import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './app/shared/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn:
      'https://c77e5e097ab847da9e7752f1268545cf@o368150.ingest.sentry.io/5637790',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true })
    ],
    tracesSampleRate: 1.0
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
  // Set app interceptors and stuff
  app.use(compression());
  app.use(helmet());
  app.use(cookieparser());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 1000
    })
  );
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: true, value: true },
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true
    })
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('Rob Bailey API')
    .addBearerAuth()
    .setDescription('A description of the API powering robbailey3.co.uk')
    .setVersion('1.0.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/help', app, document);

  const port = process.env.PORT || 3333;
  const logger = console;
  await app.listen(port, () => {
    logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
