import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.tdo';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly usersService:UsersService, //buscar o usuário em memória
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService
    ){
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    } 

    sigIn(username:string, password:string):AuthResponseDto{
        //encontrar o usuário
        const foundUser = this.usersService.findByUserName(username)
        if(!foundUser || !bcryptCompareSync(password,foundUser.password)){
            throw new UnauthorizedException();
        }

        const payoad = {sub: foundUser.id, username: foundUser.username}

        const token = this.jwtService.sign(payoad)

        return{token, expireIn: this.jwtExpirationTimeInSeconds}
    }
}
