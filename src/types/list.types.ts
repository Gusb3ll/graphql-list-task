import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Task' })
export class taskData {
  @Field(() => Number, { description: 'Unique ID of the task' })
    id: number

  @Field(() => String, { description: 'Title of the task' })
    title: string

  @Field(() => String, { description: 'Description of the task', nullable: true })
    description?: string

  @Field(() => Boolean, { description: 'State of the task (Ongoing, Completed)' })
    completed: boolean
}

@ObjectType({ description: 'List' })
export class listData {
  @Field(() => Number, { description: 'Unique ID of the list' })
    id: number

  @Field(() => String, { description: 'Title of the list' })
    title: string

  @Field(() => String, { description: 'Description of the list', nullable: true })
    description?: string

  @Field(() => [taskData], { description: 'Tasks that are in the list' })
    task: taskData[]
}

@ObjectType({ description: 'Response for getAllList' })
export class getAllListResponse {
  @Field(() => String, { description: 'Response message' })
    message: string

  @Field(() => [listData], { description: 'Array of list objects with tasks inside each one' })
    data?: listData[]
}

@ObjectType({ description: 'Response for getListById' })
export class getListByIdResponse {
  @Field(() => String, { description: 'Response message' })
    message: string

  @Field(() => listData, { description: 'List object with tasks inside' })
    data?: listData
}

@ObjectType({ description: 'Response for createList', simpleResolvers: true })
export class createListResponse {
  @Field(() => String, { description: 'Response message' })
    message: string
}

@ObjectType({ description: 'Response for createTask', simpleResolvers: true })
export class createTaskResponse {
  @Field(() => String, { description: 'Response message' })
    message: string
}

@ObjectType({ description: 'Response for updateTask', simpleResolvers: true })
export class updateTaskResponse {
  @Field(() => String, { description: 'Response message' })
    message: string
}

@ObjectType({ description: 'Response for moveTask', simpleResolvers: true })
export class moveTaskResponse {
  @Field(() => String, { description: 'Response message' })
    message: string
}
