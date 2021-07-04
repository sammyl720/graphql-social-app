const { Types } = require("mongoose")
const { Post, Comment,User, Image } = require("../models")

module.exports = {
  text: (parent, args,ctx) => {
    if(typeof parent.text == 'string'){
      return [parent.text]
    }
    return parent.text

  },
  images: async (parent) => {
    try {
      const imgs = await Image.find({ _id: parent.images })
      return imgs || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  score: (parent) => {
    return parent.score || 0
  },
  likes: async (parent, { limit = 100, skip = 0 }) => {
    try {
      const users = await User.find({ _id: parent.likes }).sort('-last_login').skip(skip).limit(limit)
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
  comments: async (parent, { limit = 100, skip = 0 },ctx) => {
    try {
      const comments = await Comment.find({ _id: parent.comments }).sort('-created_on').skip(skip).limit(limit)
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