const me = require("./me")

module.exports = {
  hello: (parent, { name }, context, info) => {
    return `Hello ${name}`
  },
  me
}