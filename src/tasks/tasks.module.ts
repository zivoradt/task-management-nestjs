import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
