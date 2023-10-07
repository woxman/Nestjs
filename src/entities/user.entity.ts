import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export default class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true,nullable:true})
    email:string

    @Column({length:25,nullable:false})
    first_name:string

    @Column({length:25,nullable:false})
    last_name:string

    @Column({nullable:false})
    password:string
}