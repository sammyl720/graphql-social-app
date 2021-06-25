module.exports = {
  hello: (parent, { name }, context, info) => {
    return `Hello ${name}`
  }
}