import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { PrismaService } from './config/PrismaService';
import { UsersModule } from './users.module';
import { CarsModule } from './cars.module';

@Module({
  imports: [UsersModule, AuthModule, CarsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
