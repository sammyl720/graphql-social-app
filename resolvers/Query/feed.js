const { Post } = require("../../models")
const {Types} = require('mongoose')
module.exports = async (parent, { limit = 10 }, { user }) => {
  try {
    const friends = await Post.find({ user: user.following[0] }).sort('created_on desc').limit(limit)
    const recommended = await Post.find().sort('likeCount desc').limit(limit)
    const popular = await Post.find().sort('score desc').limit(limit)
    console.log(recommended[0]._doc)
    return {
      friends,
      recommended,
      popular
    }

  } catch (error) {
    console.log(error)
    return {
      friends: [],
      recommended: [],
      popular: []
    }
  }
}