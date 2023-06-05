import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('create')
    async create(@Body() dto:CreateUserDto){
       return await this.userService.create(dto)
    }

}
