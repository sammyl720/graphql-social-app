module.exports = `
type Query {
  hello(name: String): String
  me: UserOrError
}
`