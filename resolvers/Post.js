const { Types } = require("mongoose")
const { Post, Comment,User } = require("../models")

module.exports = {
  text: (parent, args,ctx) => {
    if(typeof parent.text == 'string'){
      return [parent.text]
    }
    return parent.text

  },
  likes: async (parent) => {
    try {
      const users = await User.find({ _id: parent.likes })
      return users
    } catch (error) {
      console.log(error)
      return {
        message: "Something went wrong",
        errors: ["Something went wrong", error.message || '']
      }
    }
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