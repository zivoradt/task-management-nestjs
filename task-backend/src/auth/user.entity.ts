/* eslint-disable prettier/prettier */
import { Task } from './../tasks/task.entity';
/* eslint-disable prettier/prettier */
import { Entity, Unique } from 'typeorm';
/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    salt: string

    @Column('simple-array', { nullable: true })
    tasks: string[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        
        return hash === this.password;
        

    }
}