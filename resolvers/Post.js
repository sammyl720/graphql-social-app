const { Types } = require("mongoose")
const { Post, Comment,User } = require("../models")

module.exports = {
  text: (parent, args,ctx) => {
    return parent.text

  },
  user: async (parent) => {
    try {
      const user = await User.findById(parent.user)
      return user._doc
    } catch (error) {
      console.log(error)
      return null
    }
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