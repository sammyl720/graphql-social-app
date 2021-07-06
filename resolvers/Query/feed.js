const { Post } = require("../../models")
const {Types} = require('mongoose')
module.exports = async (parent, { limit = 10, skip = 0 }, { user }) => {
  try {
    const friends = await Post.find({ user: user.following }).sort('-created_on').skip(skip).limit(limit)
    const recommended = await Post.find({ public: true }).sort('-likeCount').skip(skip).limit(limit)
    const popular = await Post.find({ public: true }).sort('-score').skip(skip).limit(limit)
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