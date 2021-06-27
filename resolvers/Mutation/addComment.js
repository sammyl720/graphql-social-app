const { Post, Comment } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { data: {postId, text, images = []}}, { payload, user }, info) => {
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