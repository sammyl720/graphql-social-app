const { Post } = require('../../models')
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { id }, { payload, user }, info) => {
    try {
      if(!id){
        return { message: 'Please provide post id', errors: ['Please provide post id'] }
  
      }
      //? TODO add images to cloud and get a ref list
      const userPost = await user.posts.find(post => post._id.toString() == id)
      if(userPost){
        user.posts = await user.posts.filter(post => post._id.toString() != id)
        await user.save()
      } else {
        return {
          message: "Could not delete post",
          errors: ["Could not find post to delete"]
        }
      }

      let deleted = await Post.findByIdAndDelete(id)
      if(deleted){
        console.log(`Deleted ${deleted.text}`)
      } else {
        return {
          message: "Could not delete post",
          errors: ["Could not find post to delete"]
        }
      }
      return {
        status: `Succesfully deleted post (${deleted._id})`
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }