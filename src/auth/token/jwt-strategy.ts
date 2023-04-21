/* eslint-disable prettier/prettier */
import { UnauthorizedException } from '@nestjs/common';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtconfig } from './jwt.config';
import { JWtPayload } from '../interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        });
    }
    async validate(payload: JWtPayload):Promise<User>{
        const {username} = payload;
        const user = await this.userRepository.findOne({where: {username: username}});

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}