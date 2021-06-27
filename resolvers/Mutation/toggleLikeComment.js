const { Comment } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { id }, { payload, user }, info) => {
    try {
      if(!id){
        return { message: 'Please provide comment id', errors: ['Please provide comment id'] }
  
      }

      const comment = await Comment.findById(id);
      if(!comment){
        return { message: 'Could not find comment', errors: ['Could not find comment'] }
      }
      
      const alreadyLiked = comment.likes.find(u => {
        return u.toString() == user._id.toString()
      })
      if(alreadyLiked){
        comment.likes = comment.likes.filter(u => u.toString() != user._id.toString())
      } else {
        comment.likes.push(user._id.toString())
      }

      await comment.save()
      //? TODO add images to cloud and get a ref list
      return {
        status: `Succesfully ${alreadyLiked ? 'unliked' :'liked'} comment (${comment._id})`
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }