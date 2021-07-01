const { User, Post, Comment } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')
module.exports = async (parent, { data: { text, limit = 10}}, { user }) => {
  try {
    if(!text){
      throw new Error('text is a required field')
    }

    let rgxText = new RegExp(text.split(' ').join("|"), 'gi');
    let posts = await Post.find({ text: rgxText, public: true }).sort('-created_on').limit(limit)
    let comments = await Comment.find({ text: rgxText, public: true }).sort('-created_on').limit(limit)
    let users = []
    if(typeof text == 'string') text = text.split(' ')
    const tags = getHashTagFromText(text)

    if(tags.length > 0){
      posts = await Post.find({ tags, public: true }).sort('-created_on').limit(limit)
      comments = await Comment.find({ tags, public: true }).sort('-created_on').limit(limit)
    } else {
      users = await User.find({ $or: [{ name: rgxText }, { bio: rgxText }, { email: rgxText }]}).sort('-last_login').limit(10)
    }

    return {
      users,
      comments,
      posts
    }
  } catch (error) {
    console.log(error)
    return {
      users: [],
      comments: []
    }
  }
}