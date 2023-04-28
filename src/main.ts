import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvsConfig } from './infrastructure/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EnvsConfig.getServerPort());
}
bootstrap();
