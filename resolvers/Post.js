const { Types } = require("mongoose")
const { Post, Comment } = require("../models")

module.exports = {
  text: (parent, args,ctx) => {
    console.log('parent')
    return parent.text

  },
  comments: async (parent, args,ctx) => {
    try {
      const comments = await Comment.find({ _id: parent.comments })
      return comments
    } catch (error) {
      console.log(error)
      return {
        message: "Something went wrong",
        errors: [error.message || '']
      }
    }
  }
}