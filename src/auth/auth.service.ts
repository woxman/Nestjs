import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository:Repository<Users>,
    private readonly usersService:UsersService,
    private readonly jwtService:JwtService
  ){}

  async register(registerDto: RegisterDto) {    
    const User=await this.usersService.getUserByEmail(registerDto.email);
    console.log(User)
    if(User[0]){        
      throw new HttpException("User is in exist",400);            
    }
    registerDto.password=await bcrypt.hash(registerDto.password,10);
    return await this.usersService.createUser(registerDto);
  }

  async login(loginDto:LoginDto){
    const User=await this.usersService.getUserByEmail(loginDto.email);
    if(!User[0]){        
      throw new HttpException("User Not Found",400);            
    }
    const isPasswordMach=await bcrypt.compare(loginDto.password,User[0].password);
    if(!isPasswordMach){
      throw new HttpException("wrang password",400);
    }

    const accessToken=this.jwtService.sign({
      sub:User[0].id,
      email:User[0].email,
    });

    return {
      access_token:accessToken
    };
  }
}
