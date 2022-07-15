import { PrismaService } from '@infra/config/PrismaService';
import { AppController } from './controllers/app.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { CarsModule } from './cars.module';

@Module({
  imports: [UsersModule, AuthModule, CarsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
