const { User, Post } = require('../../models')


module.exports = async (parent, { data: { text, images = [], public = true }}, { payload }, info) => {
    console.log(payload)
    try {
      const currentUser = await User.findById(payload.id)
      if(!payload || !payload.email || !currentUser){
        return { message: 'Please login first', errors: ['Please login first'] }
      }
      console.log(currentUser, 'Current user')
  
      if(!text){
        return { message: 'Please provide post text', errors: ['Please provide post text'] }
  
      }
      //? TODO add images to cloud and get a ref list
      const newPost = new Post({
        text,
        user: currentUser._id,
        images,
        public
      })
      
      await newPost.save()
      currentUser.posts.push(newPost._id)
      await currentUser.save()
      return {
        ...newPost,
        id: newPost._id,
        created_on: newPost.created_on.toDateString()
      }
    } catch (error) {
      
    }
  }