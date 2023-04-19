/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {  DataSource, EntityRepository, Repository } from "typeorm";
import {Task} from './task.entity'
import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatus } from "./task-status.enum";



@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource)
    {
        super(Task, dataSource.createEntityManager());
    }

  async createTask(createTaskDto: CreateTaskDTO):Promise<Task>{
    const {title, description} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

}