import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {

  
    @ApiProperty()
    @IsString({message:'should be a string'})
    name:string;

    
    @ApiProperty()
    @IsString({message:'should be a string'})
    lastname:string;


    @ApiProperty()
    @IsString({message:'should be a string'})
    password:string;

}