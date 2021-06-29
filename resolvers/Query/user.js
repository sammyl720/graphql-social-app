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
    return foundUser
  } catch (error) {
    return {
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }
  }
}