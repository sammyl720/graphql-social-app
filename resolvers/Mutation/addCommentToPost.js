const { Post, Comment, User } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { data: {postId, text, images = []}}, { user }, info) => {
    try {
      const errors = []
      if(!text){
        errors.push('Please provide text field')
      } 
      if(!postId){
        errors.push('Please provide postId field')
      }

      if(errors.length > 0){
        return {
          message: 'Please provide all required fields',
          errors
        }
      }
      const post = await Post.findById(postId)
      if(!post){
        return {
          message:`Could not find post with id (${postId})` ,
          errors: [`Could not find post with id (${postId})`]
        }
      }

      const postUser = await User.findById(post.user)
      if(postUser.private || !post.public){
        console.log('user private settings')
        const isFollower = postUser.followers.includes(user._id)
        const isSelf = user._id.toString() == postUser._id.toString()
        if(!isFollower && !isSelf){
          return {
            message: 'This post is private',
            errors: ['This post is private', `${post._id} is private`]
          }
        }
      }
      //? TODO add images to cloud and get a ref list
      const hash_tags = getHashTagFromText(text)
      const newComment = new Comment({
        text,
        user: user._id,
        images,
        hash_tags,
        post: post._id
      })
      
      let comment = await newComment.save()
      post.comments.push(comment._id)
      await post.save()
      return comment._doc
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong', error.message || '']
      }
    }
  }