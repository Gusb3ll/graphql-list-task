import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import {
  createListResponse,
  createTaskResponse,
  getAllListResponse,
  getListByIdResponse,
  moveTaskResponse,
  updateTaskResponse,
} from '../types/list.types'

import listService from '../services/list.service'

@Resolver()
export class listResolver {
  @Query(() => getAllListResponse, { description: 'Get all list' })
  async getAllList(): Promise<getAllListResponse> {
    try {
      const data = await listService.getAllList()
      return { message: 'Successful', data }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Query(() => getListByIdResponse, { description: 'Get list by id' })
  async getListById(@Arg('listId', () => Number) listId: number): Promise<getListByIdResponse> {
    try {
      const data = await listService.getListById(listId)
      return { message: 'Successful', data }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Mutation(() => createListResponse, { description: 'Create a list' })
  async createList(@Arg('title', () => String) title: string, @Arg('description', () => String) description?: string): Promise<createListResponse> {
    try {
      const data = await listService.createList(title, description)
      if (data)
        return { message: 'Successful' }
      else
        return { message: 'Failed to create list' }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Mutation(() => createTaskResponse, { description: 'Create a task' })
  async createTask(@Arg('listId', () => Number) listId: number, @Arg('title', () => String) title: string, @Arg('description', () => String) description?: string): Promise<createTaskResponse> {
    try {
      const data = await listService.createTask(listId, title, description)
      if (data)
        return { message: 'Successful' }
      else
        return { message: 'Failed to create task' }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Mutation(() => updateTaskResponse, { description: 'Update task by id' })
  async updateTask(@Arg('taskId', () => Number) taskId: number, @Arg('title', () => String) title?: string, @Arg('description', () => String) description?: string, @Arg('completed', () => Boolean) completed?: boolean): Promise<updateTaskResponse> {
    try {
      const data = await listService.updateTask(taskId, title, description, completed)
      if (data)
        return { message: 'Successful' }
      else
        return { message: 'Failed to update task' }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Mutation(() => moveTaskResponse, { description: 'Move task using both tasks id\'s' })
  async moveTask(@Arg('fromId', () => Number) fromId: number, @Arg('toId', () => Number) toId: number): Promise<moveTaskResponse> {
    try {
      await listService.moveTask(fromId, toId)
      return { message: 'Successful' }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }
}
