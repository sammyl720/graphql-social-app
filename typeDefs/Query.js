const { find } = require("./docs");

module.exports = `
directive @ensureAuth on FIELD_DEFINITION
type Query {
  hello(name: String): String
  me: UserOrError @ensureAuth
  user(id:ID!): UserOrError @ensureAuth
  posts(userId:ID!): [PostOrError]! @ensureAuth
  """
  ${find}
  """
  find(data: FindInput): FindResult! @ensureAuth
}
`