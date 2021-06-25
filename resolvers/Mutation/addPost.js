const { User, Post } = require('../../models')


module.exports = async (parent, { data: { text, images = [], public = true }}, { payload }, info) => {
    // console.log(payload)
    try {
      const currentUser = await User.findById(payload.id)
      if(!payload || !payload.email || !currentUser){
        return { message: 'Please login first', errors: ['Please login first'] }
      }
      // console.log(currentUser, 'Current user')
  
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
      
      let post = await newPost.save()
      currentUser.posts.push(post._id)
      await currentUser.save()
      post = {
        ...post._doc,
        id: newPost._id,
        user: currentUser
      }
      delete post._id
      return post
    } catch (error) {
      console.log(error)
      return {
        message: 'Something went wrong',
        errors: ['Something went wrong']
      }
    }
  }