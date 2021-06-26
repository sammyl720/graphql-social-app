const { User } = require("../../models")

module.exports = async (parent, { id }, ctx, info) => {

  try {
    const foundUser = await User.findById(id);
    if(!foundUser) {
      return {
        message: 'Could not find user',
        errors: ['Could not find user with id provided ' + id]
      }
    }
    const user = { ...foundUser._doc, id: foundUser._id.toString()}
    delete user.password
    delete user._id
    delete user.__v
    // console.log(user)
    return user
  } catch (error) {
    return {
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }
  }
}