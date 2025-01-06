import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import {v4 as uui} from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {

    private readonly users:UserDto[] = []

    create(newUser:UserDto){
        newUser.id = uui(); //gera um id
        newUser.password = bcryptHashSync(newUser.password,10); //criptografa a senha
        this.users.push(newUser); //adiciona no meu 'banco de dados' local(array)
        console.log(this.users);
    }

    findByUserName(username: string): UserDto | null {
        return this.users.find(user => user.username === username)
    }
}
