import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService:UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    getUserById(
        @Param("id") id:string,
    ){
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(
        @Body() params:object
    ){
        return this.usersService.createUser(params);
    }
    
    @Put(":id")
    updateUser(
        @Param("id") id:string,
        @Body() params:object
    ){
        return this.usersService.updateUser(id,params);
    }

    @Delete(":id")
    deleteUserById(
        @Param("id") id:string,
    ){
        return this.usersService.deleteUserById(id);
    }
}
