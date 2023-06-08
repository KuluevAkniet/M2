import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UserService {
     constructor(@InjectRepository(User) private readonly userRepo:Repository<User>, @Inject('Check_Service')  private readonly client:ClientProxy){}

    async create(dto:CreateUserDto){
        try {
            const response =  await this.client
        .send({ cmd: 'token' }, dto)

        if(response){
            console.log('Ответ пришел')
            response.subscribe(item => {
                
            return;
        }
        } catch (err) {
            return {
                message: err.message,
            }
        }
    }
}
