const cloud = require('cloudinary').v2;
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
console.log(process.env.CLOUDINARY_CLOUD_NAME)
cloud.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

module.exports = cloud;