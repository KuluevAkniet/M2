import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor( @Inject('Check_Service') 
    private readonly client:ClientProxy ,
    private readonly userService:UserService, 
    private readonly jwtService:JwtService, ){}


    async registration(dto:CreateUserDto){
        const candidate = await this.userService.getUserByName(dto.name);
        if (candidate) {
            throw new HttpException('Пользователь с таким именем существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create({...dto, password: hashPassword})
        return this.generateToken(user)
    }


    async generateToken(user:User) {
        const payload = {name: user.name, id: user.id,}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async sendRequestWithToken(token:any){
        console.log('token', token)
        return this.client.send({cmd:'token'},token)
    }



    async findUserByToken(token: string) {
        try {
          const decoded = this.jwtService.verify(token);
          return true;
        } catch (err) {
          return false;
        }
    }
}
