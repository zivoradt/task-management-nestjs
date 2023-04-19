/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filters.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilters(filterDto);
        }
        else{
            return this.taskService.getAllTasks();
        }
        
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string,@Body('status', TaskStatusValidationPipe) status: TaskStatus):Task{
        return this.taskService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDTO) {

        return this.taskService.createTask(createTaskDto);
    }
}
