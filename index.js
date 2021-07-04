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
  app.use(async (req, res, next) => {
    try {
      const payload = getJWTPayload({ req })
      res.payload = payload;
    } catch (error) {
      console.log('blocked')
      return res.status(401).json({ error: error.message })
    }
    next()
  })
  app.use(express.json())
  app.use('/logout', (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({ message: 'Cleared cookie' })
  })
  const server = new ApolloServer({ typeDefs, resolvers, context: (ctx) => {
    try {
        return { ...ctx, payload: ctx.res.payload, models}
      } catch (error) {
        console.log(error)
      }
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
  console.log(process.env.NODE_ENV, 'node env')
  return { server, app };
}

module.exports = startApolloServer()