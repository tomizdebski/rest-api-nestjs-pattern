import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true, //dodaje buforowanie logow
  // });
  //app.useLogger(app.get(MyLoggerService)); //dodaje logger
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); //dodaje globalny filter
  app.enableCors(); //dodaje cors
  app.setGlobalPrefix('api'); //dodajem prefix do trasy /api

  await app.listen(3000);
}
bootstrap();

// logowanie wszystkiego jest zakomentowane
