import { expect, it } from 'vitest'

import { gql } from 'apollo-server-express'
import { sendTestRequest } from './utils'

(async () => {
  it('Should create all example list', async () => {
    const firstList = await sendTestRequest(
      gql`
        mutation CreateList {
          createList(title: "Example list 1", description: "This is example list 1") {
            message
          }
        }
      `,
    )
    const secondList = await sendTestRequest(
      gql`
        mutation CreateList {
          createList(title: "Example list 2", description: "This is example list 2") {
            message
          }
        }
      `,
    )
    expect(firstList).toEqual({ data: { createList: { message: 'Successful' } } })
    expect(secondList).toEqual({ data: { createList: { message: 'Successful' } } })
  })
  it('Should create all example task', async () => {
    const firstTask = await sendTestRequest(
      gql`
        mutation CreateTask {
          createTask(listId: 1, title: "Example task 1", description: "This is example task 1") {
            message
          }
        }
      `,
    )
    const secondTask = await sendTestRequest(
      gql`
        mutation CreateTask {
          createTask(listId: 2, title: "Example task 2", description: "This is example task 2") {
            message
          }
        }
      `,
    )
    const ThirdTask = await sendTestRequest(
      gql`
        mutation CreateTask {
          createTask(listId: 2, title: "Example task 3", description: "This is example task 3") {
            message
          }
        }
      `,
    )
    expect(firstTask).toEqual({ data: { createTask: { message: 'Successful' } } })
    expect(secondTask).toEqual({ data: { createTask: { message: 'Successful' } } })
    expect(ThirdTask).toEqual({ data: { createTask: { message: 'Successful' } } })
  })
  it('Should return all list', async () => {
    const response = await sendTestRequest(
      gql`
        query GetAllList {
          getAllList {
            message
          }
        }
      `,
    )
    expect(response).toEqual({ data: { getAllList: { message: 'Successful' } } })
  })
  it('Should return the first example list', async () => {
    const response = await sendTestRequest(
      gql`
        query GetListById {
          getListById(listId: 1) {
            message
            data {
              id
              title
              description
              task {
                id
                title
                description
                completed
              }
            }
          }
        }
      `,
    )
    expect(response).toEqual({
      data: {
        getListById: {
          message: 'Successful',
          data: {
            id: 1,
            title: 'Example list 1',
            description: 'This is example list 1',
            task: [
              {
                id: 1,
                title: 'Example task 1',
                description: 'This is example task 1',
                completed: false,
              },
            ],
          },
        },
      },
    })
  })
  it('Should update the first task with new title & description', async () => {
    const response = await sendTestRequest(
      gql`
        mutation UpdateTask {
          updateTask(taskId: 1, title: "Example task 1 updated", description: "This is example task 1 updated", completed: true) {
            message
          }
        }
      `,
    )
    expect(response).toEqual({ data: { updateTask: { message: 'Successful' } } })
  })
  it('Should move "Example task 3" to be at "Example task 2" position and 2 position to 3', async () => {
    const response = await sendTestRequest(
      gql`
        mutation MoveTask {
          moveTask(fromId: 3, toId: 2) {
            message
          }
        }
      `,
    )
    expect(response).toEqual({ data: { moveTask: { message: 'Successful' } } })
  })
})()
