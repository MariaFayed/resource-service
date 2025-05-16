import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'common/filters/exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);
   
  app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors({
    origin: configService.get<string>('FRONTEND_URI'), 
    credentials: true,             
  });

    const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger will be available at /api/docs
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
