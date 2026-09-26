import 'dotenv/config'
import 'reflect-metadata'

import express from "express"
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import { buildSchema } from "type-graphql"

// Resolvers
import { AuthResolver } from './modules/Auth/resolver'
import { UserResolver } from './modules/User/resolver'
import { buildContext } from './graphql/context'
import { TransactionResolver } from './modules/Transaction/resolver'
import { CategoryResolver } from './modules/Category/resolver'

async function main() {
  const app = express()

  app.use(cors({
    origin: '*',
    credentials: true
  }))

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, TransactionResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema
  })

  await server.start()

  app.use(
    '/graphql', 
    express.json(),
    expressMiddleware(server, {
      context: buildContext
    })
  )

  app.listen({
    port: 4000
  }, () => {
    console.log('Server is running on port 4000')
  })
}

main()