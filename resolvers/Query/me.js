const { User } = require("../../models")

module.exports = async(parent, args, { user }) => {
  try {
    delete user._doc.password
    delete user._doc.__v
    return user._doc;
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}