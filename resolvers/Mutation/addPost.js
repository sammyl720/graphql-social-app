const { Post } = require('../../models')


module.exports = async (parent, { data: { text, images = [], public = true }}, { payload, user }, info) => {
    try {
      if(!text){
        return { message: 'Please provide post text', errors: ['Please provide post text'] }
  
      }
      //? TODO add images to cloud and get a ref list
      const newPost = new Post({
        text,
        user: user._id,
        images,
        public
      })
      
      let post = await newPost.save()
      user.posts.push(post._id)
      await user.save()
      post = {
        ...post._doc,
        id: newPost._id,
        user
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