import {ApiProperty} from "@nestjs/swagger"
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";


export class TaskTypes  extends BaseEntity{
  @ApiProperty()
  @PrimaryGeneratedColumn({
    comment: "The task unique identifier"
  })

  id: string;
  @ApiProperty()
  @Column ({
    type: "varchar",
    unique: true
  })
  description: string;

  @ApiProperty()
  @Column({
    type: 'varchar'
  })
  isCompleted?: TaskStatus;
 }

 export enum TaskStatus{
  TODO= "TODO",
   COMPLETE = "Complete" ,
   IN_PROGRESS = "In progress"
 }