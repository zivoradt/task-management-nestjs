import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// eslint-disable-next-line prettier/prettier

@Module({
  imports: [TasksModule],
  // eslint-disable-next-line prettier/prettier
  
})
export class AppModule {}
