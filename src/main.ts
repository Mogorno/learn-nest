import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AllExceptionsFilter } from './shared/filters';
// import { ResponseInterceptor } from './shared/interceptors';
// import { AuthGuard } from './shared/guards';
// import { loggerFnMiddleware } from './shared/middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Learn Nest')
    .setDescription('API documentation for learn-nest')
    .setVersion('1.0.0')
    .setContact('Mogorno', 'https://github.com/Mogorno', 'suport@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
  // app.use(loggerFnMiddleware);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
