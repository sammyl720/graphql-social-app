const { Post } = require("../../models")
const {Types} = require('mongoose')
module.exports = async (parent, { limit = 10 }, { user }) => {
  try {
    const friends = await Post.find({ user: user.following[0] }).sort('created_on desc').limit(limit)
    const recommended = await Post.find().sort('likeCount desc').limit(limit)
    return {
      friends,
      recommended
    }
  } catch (error) {
    console.log(error)
    return {
      friends: [],
      recommended
    }
  }
}