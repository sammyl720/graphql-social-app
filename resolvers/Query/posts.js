const { Types } = require("mongoose");
const { Post } = require("../../models")

module.exports = async (parent, { userId }, ctx, info) => {
  try {
    const posts = await Post.find({ user: Types.ObjectId(userId)});
    // console.log(posts)
    if(!posts) {
      return [{
        message: 'Could not find post from user',
        errors: ['Could not find posts from user with id provided ' + id]
      }]
    }
    return posts
  } catch (error) {
    return [{
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }]
  }
}