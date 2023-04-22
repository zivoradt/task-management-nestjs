/* eslint-disable prettier/prettier */
import { start } from 'repl';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { DataSource, Repository } from "typeorm";
import { Task } from './task.entity'
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filters.dto";
import { User } from "src/auth/user.entity";



@Injectable()
export class TaskRepository extends Repository<Task> {

    private logger = new Logger('TaskRepository');

    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {

        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {

            await task.save();

        } catch (error) {
            
            this.logger.error(`Failed to create task for user ${user.username}, Data: ${JSON.stringify(createTaskDto)}`, error.stack)
            throw new InternalServerErrorException();
        }


        delete task.user;

        return task;
    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        try {

            const tasks = await query.getMany();
            return tasks;

        } catch (error) {

            this.logger.error(`Failed to get task for user ${user.username}, Filters: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException();
        }

    }

}