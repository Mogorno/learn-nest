import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Learn Nest')
    .setDescription('API documentation for learn-nest')
    .setVersion('1.0.0')
    .setContact('Mogorno', 'https://github.com/Mogorno', 'suport@gmail.com')
    .addBearerAuth()
    .build();
}
