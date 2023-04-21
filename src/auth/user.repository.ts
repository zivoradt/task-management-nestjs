/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'




@Injectable()
export class UserRepository extends Repository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());

    }



    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            console.log(error.code)
            if (error.code === '23505') {
                throw new ConflictException('User already exist!');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;

        const user = await this.findOne({ where: { username: username } });

        if (user && user.validatePassword(password)) {
            return user.username;
        }
        else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }


}