const { Types } = require("mongoose")
const { User, Post, Image } = require("../models")

module.exports = {
  private: (parent) => {
    console.log('is user private?', parent.private || false)
    return parent.private || false
  },
  profile_img: async(parent) => {
    try {
      const img = await Image.findById(parent.profile_img);
      return img || null;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  id: (parent) => parent._id,
  bio: (parent) => parent.bio || null,
  gender: (parent) => parent.gender || 'Unspecified',
  followers: async (parent, { limit = 100, skip = 0 }, ctx) => {
    try {
      const followers = await User.find({ _id: parent.followers }).sort('-last_login').skip(skip).limit(limit)
      return followers || []
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  },
  likedPosts: async (parent, { limit = 100, skip = 0 }, ctx) => {
    try {
      const likedPosts = await Post.find({ likes: { $in: parent.id || parent._id }}).sort('-created_on').skip(skip).limit(limit)
      return likedPosts;
    } catch (error) {
      console.log(error)
      return []
    }
  },
  requests: async (parent, { limit = 100, skip = 0 }, ctx) => {
    try {
      const requests = await User.find({ _id: parent.requests }).sort('-last_login').skip(skip).limit(limit)
      return requests || []
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  },
  following: async (parent, { limit = 100, skip = 0 }, ctx) => {
    try {
      const following = await User.find({ _id: parent.following }).sort('-last_login').skip(skip).limit(limit)
      return following || []
    } catch (error) {
      console.log(error)
      return [{
        message: `Something went wrong`,
        errors: ["Something went wrong", error.message || '']
      }]
    }
  },
  posts: async (parent, { limit = 100, skip = 0 }, context) => {
    // console.log(parent, 'parent')
    try {
      const posts = await Post.find({ _id: parent.posts }).sort('-created_on').skip(skip).limit(limit)
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