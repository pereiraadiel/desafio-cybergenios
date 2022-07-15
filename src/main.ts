import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/app.module';
import { PrismaService } from '@infra/config/PrismaService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
