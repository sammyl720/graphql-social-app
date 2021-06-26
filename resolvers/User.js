const { Types } = require("mongoose")
const { Post } = require("../models")

module.exports = {
  id: (parent) => parent._id,
  bio: (parent) => parent.bio || null,
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