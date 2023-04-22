import { TypeOrmModule } from '@nestjs/typeorm';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { strategy } from './token/jwt.config';
import { JwtStrategy } from './token/jwt-strategy';
import * as config from 'config'

const jwtConfig = config.get('jwt');

@Module({
  imports: [PassportModule.register(strategy), JwtModule.register({
    secret: process.env.JWT_SECRET || jwtConfig.secret,
    signOptions: {
      expiresIn: jwtConfig.expiresIn
    }
  }),TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [ AuthService, UserRepository, JwtStrategy ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
