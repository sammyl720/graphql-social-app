const { Post } = require("../../models")
const {Types} = require('mongoose')
module.exports = async (parent, { limit = 10 }, { user }) => {
  try {
    const friends = await Post.find({ user: user.following }).sort('-created_on').limit(limit)
    const recommended = await Post.find({ public: true }).sort('-likeCount').limit(limit)
    const popular = await Post.find({ public: true }).sort('-score').limit(limit)
    return {
      friends,
      recommended,
      popular
    }

  } catch (error) {
    console.log(error,'dsfsfsdf')
    return {
      friends: [],
      recommended: [],
      popular: []
    }
  }
}