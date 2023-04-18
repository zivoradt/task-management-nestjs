/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string):Task{
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDTO): Task {

    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id:string):void{
    this.tasks = this.tasks.filter(task => task.id !== id)
    
  }

  updateTask(id: string, status: string):void{
    this.tasks
  }


}


