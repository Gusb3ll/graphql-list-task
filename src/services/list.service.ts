import db from './db.service'

async function getAllList() {
  return await db.list.findMany({ include: { task: true } })
}

async function getListById(listId: number) {
  return await db.list.findUnique({ where: { id: listId }, include: { task: true } })
}

async function createList(title: string, description?: string) {
  return await db.list.create({ data: { title, description } })
}

async function createTask(listId: number, title: string, description?: string) {
  return await db.task.create({ data: { listId, title, description } })
}

async function updateTask(taskId: number, title?: string, description?: string, completed?: boolean) {
  return await db.task.update({ where: { id: taskId }, data: { title, description, completed } })
}

async function moveTask(fromId: number, toId: number) {
  const fromTask = await db.task.findUnique({ where: { id: fromId } })
  const toTask = await db.task.findUnique({ where: { id: toId } })
  await db.task.delete({ where: { id: fromId } })
  await db.task.delete({ where: { id: toId } })
  await db.task.create({ data: { id: fromId, listId: fromTask.listId, title: toTask.title, description: toTask.description, completed: toTask.completed } })
  await db.task.create({ data: { id: toId, listId: toTask.listId, title: fromTask.title, description: fromTask.description, completed: fromTask.completed } })
}

export default { getAllList, getListById, createList, createTask, updateTask, moveTask }
