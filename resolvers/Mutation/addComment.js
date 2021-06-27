const { Post, Comment, User } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { data: {commentId, text, images = [], public }}, { user }, info) => {
    try {
      const errors = []
      if(!public){
        public = !user.private
      }
      
      if(!text){
        errors.push('Please provide text field')
      } 
      if(!commentId){
        errors.push('Please provide commentId field')
      }

      if(errors.length > 0){
        return {
          message: 'Please provide all required fields',
          errors
        }
      }
      const comment = await Comment.findById(commentId)
      if(!comment){
        return {
          message:`Could not find comment with id (${commentId})` ,
          errors: [`Could not find comment with id (${commentId})`]
        }
      }

      const commentUser = await User.findById(comment.user)
      if(commentUser.private || !comment.public){
        console.log('user private settings')
        const isFollower = commentUser.followers.includes(user._id)
        const isSelf = user._id.toString() == commentUser._id.toString()
        if(!isFollower && !isSelf){
          return {
            message: 'This comment is private',
            errors: ['This comment is private', `${post._id} is private`]
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
        post: comment.post
      })
      
      let updatedComment = await newComment.save()
      comment.comments.push(updatedComment._id)
      await comment.save()
      return updatedComment._doc
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong', error.message || '']
      }
    }
  }