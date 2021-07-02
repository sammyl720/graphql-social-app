const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const getJWTPayload = require('./util/getJWTPayload')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const models = require('./models')
const EnsureAuth = require('./directives/ensureAuth')


if(process.argv[process.argv.length - 1].toUpperCase() == 'TEST'){
  require('dotenv').config({ path: "./test.env"})
} else {
  require('dotenv').config()
}

const port = process.env.PORT || 4000

async function startApolloServer(){
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  const server = new ApolloServer({ typeDefs, resolvers, context: (ctx) => {
      const payload = getJWTPayload(ctx)
      return { payload, models}
    },
    schemaDirectives: {
      ensureAuth: EnsureAuth
    },
    
  })

  const db = process.env.MONGO_DB


  const initConnection = async () => {
    try {
      const uri = `${process.env.MONGO_URI}/${db}?retryWrites=true&w=majority`;
      const connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('Connected')
      return connection
    } catch (error) {
      console.log(error)
    }
  }

  initConnection()

  await server.start()
  server.applyMiddleware({ app, bodyParserConfig: true, path: '/api' })

  app.use('/',express.static(path.resolve(__dirname, 'public')))
  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

module.exports = startApolloServer()