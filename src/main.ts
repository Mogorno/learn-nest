import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './shared/utils';
// import { AllExceptionsFilter } from './shared/filters';
// import { ResponseInterceptor } from './shared/interceptors';
// import { AuthGuard } from './shared/guards';
// import { loggerFnMiddleware } from './shared/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);
  // app.use(loggerFnMiddleware);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
