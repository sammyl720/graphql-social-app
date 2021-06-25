module.exports = `
directive @ensureAuth on FIELD_DEFINITION
type Query {
  hello(name: String): String
  me: UserOrError @ensureAuth
}
`