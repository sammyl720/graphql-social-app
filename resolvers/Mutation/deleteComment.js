const { Post, Comment } = require('../../models')

module.exports = async (parent, { id }, { user }) => {
    try {
      if(!id){
        return { message: 'Please provide comment id', errors: ['Please provide comment id'] }
  
      }
      //? TODO add images to cloud and get a ref list
      const commentToBeDeleted = await Comment.findById(id)
      if(!commentToBeDeleted){
        return {
          message: "Could not find comment with given id",
          errors: ["Could not find comment with given id"]
        }
      }
      const commentsBelongsToUser = commentToBeDeleted.user.toString() == user._id.toString()
      if(!commentsBelongsToUser){
        return {
          message: "Could not find comment with given id",
          errors: ["Could not find comment with given id", "access denied"]
        }
      }
      // console.log(commentToBeDeleted)
      let deleted = await Comment.findByIdAndDelete(commentToBeDeleted._id)
      let deletedComments = await Comment.deleteMany({ _id: deleted.comments })
      // console.log(deleted.text, "deleted")
      // console.log(deletedComments.deletedCount, 'deleted comments')
      if(deleted){
        console.log(`Deleted ${deleted.text}`)
      } else {
        return {
          message: "Could not delete comment",
          errors: ["Could not find comment to delete"]
        }
      }
      return {
        status: `Succesfully deleted comment (${deleted._id}). Deleted ${deletedComments.deletedCount} comment(s) associated with this comment`
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }