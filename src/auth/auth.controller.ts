import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.tdo';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    sigIn(
        @Body('username') username:string,
        @Body('password') password:string
     ):AuthResponseDto{
        return this.authService.sigIn(username,password);
    }
}
