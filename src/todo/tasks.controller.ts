import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskTypes } from "./task.types";
import {ApiBody, ApiResponse} from "@nestjs/swagger"


@Controller('tasks')
export class TasksController {
  constructor( private  readonly tasksService: TasksService) {
  }

  @Get()
  @ApiBody({type: [TaskTypes]})
  @ApiResponse({
    status: 200,
    description: "Get all Tasks list on DB"
  })
  getTasks() {
    throw  this.tasksService.findAllTasks()
  }

  @Get(':taskId')
  @ApiBody({type: [TaskTypes]})
  @ApiResponse({
    status: 200,
    description: "Get task by Id"
  })
  getTasksById(@Param("taskId") id: string){
    let task = this.tasksService.findTasksById(id)

    return task;
  }


  @Post()
  @ApiBody({type: [TaskTypes]})
  @ApiResponse({
    status: 200,
    description: "Add new task to DB"
  })
  createTask(@Body() createTask: TaskTypes): Promise<TaskTypes | any> {
    const newTask = this.tasksService.createTask(createTask);
    return newTask
  }

  @Put(":taskId")
  @ApiBody({type: [TaskTypes]})
  @ApiResponse({
    status: 200,
    description: "Get and Update task by id" 
  })
  updateTask(@Body() updateTodo, @Param("id") id): Promise<TaskTypes| any> {
   const updatedTask = this.tasksService.updateTask(updateTodo)
    return updatedTask
  }

  @Delete(":taskId")
  @ApiBody({type: [TaskTypes]})
  @ApiResponse({
    status: 200,
    description: "Delete resonse by id"
  })
  deleteTask(@Param("id") id): Promise<TaskTypes | null> {
    const deletedTask = this.tasksService.deleteTask(id)

    return deletedTask
  }

}
