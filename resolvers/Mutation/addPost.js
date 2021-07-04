const { Post, Image } = require('../../models')
const uploader = require('../../util/createImg'); 
const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { data: { text = [], images = [], public = true }}, { payload, user }, info) => {
    try {
      if (images.length > 4) {
        return { message: 'You can only upload upto four images per post', errors: ['You can only upload upto four images per post'] }
      }
      if(text.length < 1){
        return { message: 'Please provide post text', errors: ['Please provide post text'] }
  
      }

      const hash_tags = getHashTagFromText(text)
      
      const newPost = await Post.create({
        text,
        user: user._id,
        hash_tags,
        public
      })
      
      let uploadedImages = [];
      if(images.length > 0){
        for(let i = 0; i < images.length;i++){
          image = images[i];
          if(!image.filename || !image.base64){
            return { message: 'Please provide base64 and filename fields', errors: ['Please provide base64 and filename fields'] }
          }
          const img = await uploader(image.base64, `${user._id}/${newPost._id}/${i}/${image.filename}`)
          const ImageDoc = await Image.create(img)
          uploadedImages.push(ImageDoc.id);
        }
      }

      newPost.images = uploadedImages
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