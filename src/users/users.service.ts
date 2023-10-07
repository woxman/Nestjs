import { Injectable } from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import Users from "../entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly user_repository : Repository <Users>,
    ) {}

    async getAllUsers(){
        const users=await this.user_repository.find();
        return {
            message:"getAllUsers",
            users
        }
    }

    async getUserByEmail(email:string){
        return this.user_repository.find({
            where:{email:email}
        })
    }
    
    async getUserById(id:string){
        const user=await this.user_repository.findOneById(id);
        return {
            message:"getUserById",
            user
        }
    }

    async createUser(params:object){
        const user=await this.user_repository.create(params);
        const status=await this.user_repository.save(user);
        return status;
    }

    updateUser(id:string,params:object){
        return {
            message:"updateUser",
            id:id,
            params:params
        }
    }
    
    deleteUserById(id:string){
        return {
            message:"deleteUserById",
            id:id
        }
    }
}
