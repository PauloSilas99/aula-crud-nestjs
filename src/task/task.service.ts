import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks:TaskDto[] = []

    create(task:TaskDto){
        this.tasks.push(task)
        console.log(this.tasks)
    }

    findById(id:string):TaskDto{
        const foundTask = this.tasks.filter(t => t.id === id);
        if(foundTask.length){
            return foundTask[0]
        }
        throw new NotFoundException(`Task com id ${id} não encontrado`);
    }

    findAll(params:FindAllParameters):TaskDto[]{
        return this.tasks.filter(t => {
            let match = true;

            if(params.title != undefined && !t.title.includes(params.title)){
                match = false
            }

            if(params.status != undefined && !t.status.includes(params.status)){
                match = false
            }

            return match;
        })
    }

    // entre os parenteses se diz:"recebe um objeto do tipo taskdto"
    update(task:TaskDto){

        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if(taskIndex >=0){
            this.tasks[taskIndex] = task;
            return
        }

        throw new HttpException(`Task com id ${task.id} não encontrado`,HttpStatus.BAD_REQUEST);
    }

    remove(id:string){
        let taskIndex = this.tasks.findIndex(t=> t.id === id)

        if(taskIndex >=0){
            this.tasks.splice(taskIndex,1)
            return
        }
        throw new HttpException(`Task com id ${id} não encontrado`,HttpStatus.BAD_REQUEST)
    }
}
