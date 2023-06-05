import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
     constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}

    async create(dto:CreateUserDto){
        return await this.userRepo.save(dto)
     }

    async getUserByName(name:string) {
        const user = await this.userRepo.findOne({where: {name}})
        return user;
    }


}
