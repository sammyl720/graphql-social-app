const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const getJWTPayload = require('./util/getJWTPayload')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const models = require('./models')
const EnsureAuth = require('./directives/ensureAuth')




const server = new ApolloServer({ typeDefs, resolvers, context: (ctx) => {
  const payload = getJWTPayload(ctx)
  return { payload,from: 'CONTEXT', models}
},
schemaDirectives: {
  ensureAuth: EnsureAuth
} })


server.listen().then(async ({ url }) => {
  console.log(`Server ready at ${url}`)
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Connected')
  } catch (error) {
    console.log('Error')
    console.log(error)
  }
})