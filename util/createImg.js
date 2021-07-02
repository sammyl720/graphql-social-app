const cloudinary = require('../cloudinary');

const uploader = async (image, name) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      public_id: name
    })
    console.log(result);
    return result;

  } catch (error) {
    console.log('dsfonmsdn');
    return null;
  }
}

module.exports = uploader;