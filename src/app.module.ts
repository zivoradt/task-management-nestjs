/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

// eslint-disable-next-line prettier/prettier

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig)],
  // eslint-disable-next-line prettier/prettier
  
})
export class AppModule {}
