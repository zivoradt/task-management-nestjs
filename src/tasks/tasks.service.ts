import { Repository } from 'typeorm';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filters.dto';
import { start } from 'repl';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }



  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!foundTask) {
      throw new NotFoundException();
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }


  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
  }
  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save()
    return task;
  } 
}


