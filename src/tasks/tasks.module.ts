import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  // eslint-disable-next-line prettier/prettier
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
