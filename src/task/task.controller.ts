import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    // importar o Service pelo "constructor"
    constructor(private readonly taskservice : TaskService){}

    @Post()
    // @Body() => argumento para receber a tipagem
    create(@Body() task:TaskDto){
        this.taskservice.create(task)
    }

    @Get('/:id')
    // usando o "@Param()" obtém todos os parâmetros passados na rota
    findById(@Param('id') id:string){
        return this.taskservice.findById(id)
    }

    @Get()
    // uso do queryparams
    findAll(@Query() params:FindAllParameters):TaskDto[] {
        return this.taskservice.findAll(params);
    }

    @Put()
    update(@Body() task:TaskDto){
        this.taskservice.update(task)
    }

    @Delete('/:id')
    remove(@Param('id') id:string){
        return this.taskservice.remove(id);
    }
}
