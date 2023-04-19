/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { IsNotEmpty } from 'class-validator';



export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string
}