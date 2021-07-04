const feed = require("./feed")
const find = require("./find")
const me = require("./me")
const posts = require("./posts")
const publicUser = require("./publicUser")
const refresh = require("./refresh")
const user = require("./user")

module.exports = {
  hello: (parent, { name }, context, info) => {
    return `Hello ${name}`
  },
  me,
  user,
  posts,
  find,
  feed,
  publicUser,
  refresh
}
