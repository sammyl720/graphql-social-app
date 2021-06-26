const { Post } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { id }, { payload, user }, info) => {
    try {
      if(!id){
        return { message: 'Please provide post id', errors: ['Please provide post id'] }
  
      }

      const post = await Post.findById(id);
      if(!post){
        return { message: 'Could not find post', errors: ['Could not find post'] }
      }
      
      const alreadyLiked = post.likes.includes(u => u._id.toString() == user._id)
      if(alreadyLiked){
        post.likes.filter(u => u._id.toString() != user._id)
      } else {
        post.likes.push(user._id)
      }

      await post.save()
      //? TODO add images to cloud and get a ref list
      
      return {
        status: `Succesfully ${alreadyLiked ? 'unliked' :'liked'} post (${post._id})`
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }