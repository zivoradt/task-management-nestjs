import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks()
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        return this.taskService.deleteTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO) {

        return this.taskService.createTask(createTaskDto);
    }
}