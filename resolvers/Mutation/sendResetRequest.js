const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../mail')
const { isEmail } = require('../../util/rgx')
console.log(process.env.WEBSITE)
const url = process.env.BASE_URL || 'http://127.0.0.1:3000'
module.exports = async (parent, { email }) =>{
  try {
    if(!isEmail(email)){
      return {
        message: 'Please provide a valid email address',
        errors: ['Please provide a valid email address']
      }
    }
    const user = await User.findOne({ email })
    if(!user){
      return {
        message: "Could not find user with email " + email,
        errors: ["Could not find user with email " + email]
      }
    }

    const token = jwt.sign({ id: user._id, email}, process.env.JWT_SECRET, { expiresIn: '1 days'})
    const info = await sendEmail('reset', { to: `"${user.name}", ${user.email}`, subject: "Reset your password", text: "A password reset was requested for your account on Kesher"}, { user, website: process.env.WEBSITE, url: `${url}/reset/${token}` })
    console.log(info)
    return {
      status: `We've sent you an e-mail link to reset your password`
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Something went wrong",
      errors: ["Something went wrong", error.message || '']
    }
  }
}