import { Injectable, NotImplementedException } from "@nestjs/common";
import { TaskTypes, TaskStatus } from "./task.types";

@Injectable()
export class TasksService {
  findAllTasks() {
    return tasks;
  }

  findTasksById(id: string): TaskTypes {
    return tasks.find(t => t.id == id)
  }
  createTask(createTask): TaskTypes {
    const newTask: TaskTypes = {
      id: (tasks.length + 1  ).toString(),
      ...createTask
    };

    const descriptions = tasks.find(tasks => tasks.description === createTask.description)

    if (descriptions) {
      throw new NotImplementedException()
    }

    tasks = [...tasks, newTask]

    return newTask
  }

}

export let tasks: TaskTypes[] = []