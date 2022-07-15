import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { CarsModule } from './cars.module';

@Module({
  imports: [UsersModule, AuthModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
