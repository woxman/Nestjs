import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from "passport";
import * as Session from "express-session";
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    
  }));
  app.use(Session({
    secret:"Secret"
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  

  const config = new DocumentBuilder()
    .setTitle('My Project')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
