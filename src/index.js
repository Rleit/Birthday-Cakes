import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import { get, getIsDev } from 'config'
import resolvers from 'resolvers'
import typeDefs from 'schema'

const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({ typeDefs, resolvers }) // Merge type definitions with resolvers
const app = express() // Create an Express app

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Apollo server start function with its options
async function startApolloServer() {
    const server = new ApolloServer({ schema })

    const { url } = await startStandaloneServer(server, {
        listen: { port: get().port },
    })

    app.use('/api', expressMiddleware(server))

    console.log(
        `Server is now running on ${
            getIsDev() ? 'http' : 'https'
        }://localhost:${get().port}/api`
    )
}

// Start a server
startApolloServer()
