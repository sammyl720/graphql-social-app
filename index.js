const { ApolloServer } = require('apollo-server')

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

const server = new ApolloServer({ typeDefs, resolvers, context: (ctx) => {
  const payload = getJWTPayload(ctx)
  return { payload,from: 'CONTEXT', models}
},
schemaDirectives: {
  ensureAuth: EnsureAuth
} })

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
server.listen({ port }).then(async ({ url }) => {
  console.log(`Server ready at ${url}`)
})

module.exports = server