import { HttpException, HttpStatus, Injectable, NotImplementedException } from "@nestjs/common";
import { TaskTypes, TaskStatus } from "./task.types";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {

  private  readonly  repository: Repository<TaskTypes>
  public  async findAllTasks(): Promise<TaskTypes | any> {
    const allTask = await this.repository.find()

    return allTask
  }
  public  async findTasksById(id: string):Promise <TaskTypes | undefined>{
    const task: TaskTypes = await this.repository.findOne({where: {id}})

    if(!task) {
      throw  new HttpException(`Task with ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return task
  }

 public async createTask(body: TaskTypes): Promise<TaskTypes | any> {
    const {description, isCompleted}: TaskTypes = body;
    let task: TaskTypes = await this.repository.findOne({where: {description}});

    if(task){
      throw  new HttpException('Conflict', HttpStatus.CONFLICT)
    }

    task = new TaskTypes();

   task.description = description;
   task.isCompleted = isCompleted


   return  this.repository.save(task)
  }

  public async updateTask(task: TaskTypes): Promise<TaskTypes | any> {
    const {id, description,isCompleted }: TaskTypes = task

    const oldTask: TaskTypes = await this.repository.findOne({where: {id}})

    if (!oldTask){
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    } else {
     return  this.repository.update(id, {description: description, isCompleted: isCompleted})
    }
  }

  public async deleteTask (id): Promise<TaskTypes | any> {
    const deleteTask = await this.repository.findOne({where: {id}})

    if(!deleteTask){
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }else  {
      return  this.repository.delete({id})
    }
  }

}

