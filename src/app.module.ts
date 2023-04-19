/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

// eslint-disable-next-line prettier/prettier

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  // eslint-disable-next-line prettier/prettier
  
})
export class AppModule {}
