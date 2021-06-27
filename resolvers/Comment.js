const { Post, User, Comment } = require("../models")

module.exports = {
  id: (parent, args,ctx) => {
    return parent._id
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
      if(!user){
        throw new Error('Could not find user')
      }
      return user
    } catch (error) {
      console.log(error)
      return {
        message: "Something went wrong",
        errors: ["Something went wrong", error.message || '']
      }
    }
  },
  post: async (parent) => {
    try {
      const post = await Post.findById(parent.post)
      if(!post){
        throw new Error('Could not find post')
      }
      return post
    } catch (error) {
      console.log(error)
      return {
        message: "Something went wrong",
        errors: ["Something went wrong", error.message || '']
      }
    }
  }
}