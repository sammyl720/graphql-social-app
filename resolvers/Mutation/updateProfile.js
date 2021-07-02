const { User, Image } = require("../../models")
const uploader = require('../../util/createImg');
module.exports = async (parent, {data}, { user }, info) => {
  try {
    data.last_updated = new Date()
    if(data.profile_img){
      const { base64, filename} = data.profile_img;
      if(!base64 || !filename){
        return {
          message: "Profile Image should have a base64 and filename field",
          errors: ["Profile Image should have a base64 and filename field"]
        }
      }

      const img = await uploader(base64, `${user._id}/profile_img/${filename}`)
      const imgDoc = await Image.create(img);
      data.profile_img = imgDoc._id;
    }
    const db_user = await User.findByIdAndUpdate(user._id, data, { new: true, lean: true })
    // console.log(db_user)
    return {
      status: `Updated profile of ${db_user.name}`
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Something went wrong",
      errors: ["Something went wrong", error.message || '']
    }
  }
}