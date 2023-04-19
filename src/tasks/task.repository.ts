/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { EntityRepository, Repository } from "typeorm";
import {Task} from './task.entity'


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
}