const { Types } = require("mongoose")
const { Post } = require("../models")

module.exports = {
  text: (parent, args,ctx) => {
    console.log('parent')
    return parent.text

  }
}