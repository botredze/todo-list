import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskTypes } from "./task.types";
import {ApiBody} from "@nestjs/swagger"


@Controller('tasks')
export class TasksController {
  constructor( private  readonly tasksService: TasksService) {
  }

  @Get()
  getTasks() {
    throw  this.tasksService.findAllTasks()
  }

  @Get(':taskId')
  getTasksById(@Param("taskId") id: string){
    let task = this.tasksService.findTasksById(id)

    return task;
  }


  @Post()
  createTask(@Body() createTask: TaskTypes): Promise<TaskTypes | any> {
    const newTask = this.tasksService.createTask(createTask);
    return newTask
  }

  @Put(":taskId")
  @ApiBody({})
  updateTask(@Body() updateTodo, @Param("id") id): Promise<TaskTypes| any> {
   const updatedTask = this.tasksService.updateTask(updateTodo)
    return updatedTask
  }

  @Delete(":taskId")
  deleteTask(@Param("id") id): Promise<TaskTypes | null> {
    const deletedTask = this.tasksService.deleteTask(id)

    return deletedTask
  }

}
