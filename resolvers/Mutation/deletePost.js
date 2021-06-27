const { Post, Comment } = require('../../models')

module.exports = async (parent, { id }, { user }) => {
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
      let deletedComments = await Comment.deleteMany({ post: deleted._id })
      console.log(deleted.text, "deleted")
      console.log(deletedComments.deletedCount, 'deleted comments')
      if(deleted){
        console.log(`Deleted ${deleted.text}`)
      } else {
        return {
          message: "Could not delete post",
          errors: ["Could not find post to delete"]
        }
      }
      return {
        status: `Succesfully deleted post (${deleted._id}). Deleted ${deletedComments.deletedCount} comment(s) associated with this post`
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }