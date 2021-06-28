const bcrypt = require('bcryptjs')
const User = require('../../models/User')

module.exports = async(parent, { password }, { user }) => {
  try {
    const errors = []
    if(!password){
      errors.push('Please provide a password')
    }
  
    if(password.length < 6){
      errors.push('Password must be at least 6 characters long')
    }
    if(errors.length > 0){
      return {
        message: errors[0],
        errors
      }
    }

    const hashedPassword = bcrypt.hashSync(password)

    await User.findByIdAndUpdate(user._id, { password: hashedPassword })
    // todo : maybe send email to notify of password update
    return {
      status: "Successfully updated your password"
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Something went wrong",
      errors: ["Something went wrong", error.message || '']
    }
  }
}