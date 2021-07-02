const { Post, Comment, User, Image } = require('../../models')
const uploader = require('../../util/createImg'); 

const getHashTagFromText = require('../../util/getHashTagFromText')


module.exports = async (parent, { data: {postId, text = [], images = [], public }}, { user }, info) => {
    try {
      const errors = []
      if(!public){
        public = !user.private
      }
      if(text.length < 1){
        errors.push('Please provide text field')
      } 
      if(!postId){
        errors.push('Please provide postId field')
      }
      
      if (images.length > 2){
        errors.push('You can only upload upto two images per comment')
        
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

      const postUser = await User.findById(post.user)
      if(postUser.private || !post.public){
        console.log('user private settings')
        const isFollower = postUser.followers.includes(user._id)
        const isSelf = user._id.toString() == postUser._id.toString()
        if(!isFollower && !isSelf){
          return {
            message: 'This post is private',
            errors: ['This post is private', `${post._id} is private`]
          }
        }
      }
      //? TODO add images to cloud and get a ref list
      const hash_tags = getHashTagFromText(text)
      const newComment = await Comment.create({
        text,
        user: user._id,
        public,
        hash_tags,
        post: post._id
      })
      
      let uploadedImages = [];
      if(images.length > 0){
        for(let i = 0; i < images.length;i++){
          image = images[i];
          if(!image.filename || !image.base64){
            return { message: 'Please provide base64 and filename fields', errors: ['Please provide base64 and filename fields'] }
          }
          const img = await uploader(image.base64, `${postId}/${newComment._id}/${i}/${image.filename}`)
          const ImageDoc = await Image.create(img)
          uploadedImages.push(ImageDoc.id);
        }
      }
      newComment.images = uploadedImages;
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