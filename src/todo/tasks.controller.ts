import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { tasks, TasksService } from "./tasks.service";
import { TaskTypes } from "./task.types";
import {ApiBody} from "@nestjs/swagger"


let tasksData = tasks
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

    if (!task) {
      throw  new NotImplementedException(`Task with ID ${id} not found`)
    }
    return task;
  }


  @Post()
  createTask(@Body() createTask: TaskTypes): TaskTypes {
    const newTask = this.tasksService.createTask(createTask);
    return newTask
  }

  @Put(":taskId")
  @ApiBody({})
  updateTask(@Body() updateTodo, @Param("id") id): TaskTypes {
    tasksData = tasksData .map( tasks => (tasks.id === id ? updateTodo: tasks));

    return updateTodo
  }

  @Delete(":taskId")
  deleteTask(@Param("id") id): TaskTypes {
    const taskToDelete = tasksData.find(tasks => tasks.id === id);
    tasksData = tasksData.filter(tasks => tasks.id !== id)

    return taskToDelete
  }

}
