import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[TypeOrmModule.forFeature([User]), ClientsModule.register([{
    name:'Check_Service',
       transport:Transport.RMQ,
       options:{
          urls:['amqps://kitlyuux:LgtxkjvPqPzT7lvKyC3z62h_wqlui_xI@shark.rmq.cloudamqp.com/kitlyuux'],
          queue:'cats_queue',
          queueOptions:{
            durable:false
          },
       },
  }])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,UserModule]
})
export class UserModule {}
