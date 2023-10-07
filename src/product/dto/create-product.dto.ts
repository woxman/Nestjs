import {IsString,IsNotEmpty,MinLength,IsNumber,IsOptional} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description:'the title of description',
        minLength:10,
        maxLength:50,
        example:"This is product title"
    })
    @IsString()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description:string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    price:number;
}
