module.exports = async(parent, args, { user, req }) => {
  try {
    delete user._doc.password
    return user._doc;
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}