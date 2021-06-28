require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const sendEmail = require('../../mail')
const url = process.env.BASE_URL || 'http:127.0.0.1:3000'
module.exports = async (parent, { data: { email, password, name }}, ctx, info) => {
  // backend login logi
  // console.log(headers, from)
  const errors = []
  if(!email){
    errors.push('Please provide an email')
  }

  if(!password){
    errors.push('Please provide a password')
  }

  if(password.length < 6){
    errors.push('Password must be at least 6 characters long')
  }
  if (!name){
    errors.push('Please provide a name')
  }

  if(errors.length > 0){
    return {
      message: errors[0],
      errors
    }
  }

  try {
    const userExists = await User.findOne({ email })
    console.log(userExists)
    if(userExists) {
      return {
        message: 'Please provide proper credential',
        errors: [`User with email ${email} already exists`]
      }
    }
    const hashedPassword = bcrypt.hashSync(password)
    const newUser = new User({
      email,
      password: hashedPassword,
      name
    })

    await newUser.save()
    const token = jwt.sign({ id: newUser._id, email}, process.env.JWT_SECRET, { expiresIn: '2 days'})
    
    sendVerifyEmail(newUser, token)
    return { token }
  } catch (error) {
    return {
      message: 'Something went wrong',
      errors: [error]
    }
  }

}

async function sendVerifyEmail(user, token){
  try {
    const info = await sendEmail("welcome", { to: `"${user.name}", ${user.email}`, subject: "Welcome aboard!", text: "Welcome to Kesher"}, { user, website: process.env.WEBSITE, url: `${url}/verify/${token}` })
    console.log(info)
  } catch (error) {
    console.log('error', error)
  }
}