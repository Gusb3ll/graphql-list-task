import http from 'http'
import 'reflect-metadata'
import express from 'express'
import { print } from 'graphql'
import request from 'supertest'
import type { DocumentNode } from 'graphql'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from 'type-graphql'
import { listResolver } from '../src/resolvers/list.resolver'

let cachedServer: any

const createServer = async () => {
  const app = express()
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [listResolver],
    }),
  })
  const httpServer = http.createServer(app)
  await server.start()
  server.applyMiddleware({ app })
  return httpServer
}

export const sendTestRequest = async (
  query: DocumentNode,
  {
    variables = {},
    headers = {},
  }: {
    variables?: any
    headers?: Record<string, string>
  } = {},
): Promise<any> => {
  const server = cachedServer ?? (await createServer())
  cachedServer = server
  const requestBuilder = request(server).post('/graphql')

  Object.entries(headers).forEach(([key, value]) => {
    requestBuilder.set(key, value)
  })
  const { text } = await requestBuilder.send({
    variables,
    query: print(query),
  })
  return JSON.parse(text)
}
