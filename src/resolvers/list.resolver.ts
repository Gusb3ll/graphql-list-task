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
  @Query(() => getAllListResponse)
  async getAllList(): Promise<getAllListResponse> {
    try {
      const data = await listService.getAllList()
      return { message: 'Successful', data }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Query(() => getListByIdResponse)
  async getListById(@Arg('listId') listId: number): Promise<getListByIdResponse> {
    try {
      const data = await listService.getListById(listId)
      return { message: 'Successful', data }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }

  @Mutation(() => createListResponse)
  async createList(@Arg('title') title: string, @Arg('description') description?: string): Promise<createListResponse> {
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

  @Mutation(() => createTaskResponse)
  async createTask(@Arg('listId') listId: number, @Arg('title') title: string, @Arg('description') description?: string): Promise<createTaskResponse> {
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

  @Mutation(() => updateTaskResponse)
  async updateTask(@Arg('taskId') taskId: number, @Arg('title') title?: string, @Arg('description') description?: string, @Arg('completed') completed?: boolean): Promise<updateTaskResponse> {
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

  @Mutation(() => moveTaskResponse)
  async moveTask(@Arg('fromId') fromId: number, @Arg('toId') toId: number): Promise<moveTaskResponse> {
    try {
      await listService.moveTask(fromId, toId)
      return { message: 'Successful' }
    }
    catch {
      return { message: 'Internal Server Error' }
    }
  }
}
