import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

      
    @Get('/signUp')
    @ApiOperation({summary:'registration user'})
    @ApiResponse({    
        status: 200, 
        description: 'Successfully signup user',
        type: String,})
     async registration(@Body() userDto:CreateUserDto) {
       try{
         const token = await this.authService.registration(userDto);
         return this.authService.sendRequestWithToken(token)
         
       }catch{
          return "Token was not send"
       }
     

    }
}
