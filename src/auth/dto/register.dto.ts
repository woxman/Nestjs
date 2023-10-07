import { PartialType } from '@nestjs/mapped-types';

export class RegisterDto{
    email:string;
    first_name:string;
    last_name:string;
    password:string;
}
