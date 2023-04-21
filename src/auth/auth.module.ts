import { TypeOrmModule } from '@nestjs/typeorm';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { jwtconfig, strategy } from './token/jwt.config';
import { JwtStrategy } from './token/jwt-strategy';


@Module({
  imports: [PassportModule.register(strategy), JwtModule.register(jwtconfig),TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [ AuthService, UserRepository, JwtStrategy ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
