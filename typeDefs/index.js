const { gql } = require('apollo-server')
const inputs = require('./inputs')
const Mutation = require('./Mutation')
const Query = require('./Query')
const types = require('./types')
const unions = require('./unions')

module.exports = gql`
  ${Query}

  ${Mutation}
  
  ${types}

  ${inputs}

  ${unions}
`