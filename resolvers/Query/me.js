const { User } = require("../../models")

module.exports = async(parent, args, { user }) => {
  try {
    delete user._doc.password
    delete user._doc.__v
    let date = new Date(user._doc.date_joined)
    console.log(user._doc)
    console.log(date.toDateString())
    return user._doc;
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}