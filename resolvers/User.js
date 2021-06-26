const { Types } = require("mongoose")
const { User } = require("../models")
const { Post } = require("../models")

module.exports = {
  id: (parent) => parent._id,
  bio: (parent) => parent.bio || null,
  followers: async (parent, args, ctx) => {
    try {
      const followers = await User.find({ _id: parent.followers })
      return followers || []
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  },
  following: async (parent, args, ctx) => {
    try {
      const following = await User.find({ _id: parent.following })
      return following || []
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  },
  posts: async (parent, args, context) => {
    // console.log(parent, 'parent')
    try {
      const posts = await Post.find({ _id: parent.posts })
      // console.log(posts,'posts')
      if(!posts) {
        return [{
          message: `No posts by ${parent.name}`,
          errors: ["nothing to see here"]
        }]
      }
      // console.log('first', posts[0])
      return posts
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  }
}