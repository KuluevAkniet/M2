import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans';

@Module({
  imports:[ClientsModule.register([{
       name:'Check_Service',
       transport:Transport.RMQ,
       options:{
          urls:['amqps://kitlyuux:LgtxkjvPqPzT7lvKyC3z62h_wqlui_xI@shark.rmq.cloudamqp.com/kitlyuux'],
          queue:'cats_queue',
          queueOptions:{
            durable:false
          },
       },
  }]),UserModule,JwtModule.register({
      
    secret:jwtConstants.secret,
      signOptions: { expiresIn: '60s' },

  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
