require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

module.exports = async (parent, { data: { email, password, name }}, { headers, from}, info) => {
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
    console.log('new user', newUser)
    const token = jwt.sign({ id: newUser._id, email}, process.env.JWT_SECRET, { expiresIn: '2 days'})
    let user = {
      id: newUser._id,
      email: newUser.email,
      bio: newUser.bio || null,
      name: newUser.name,
      profile_img: newUser.profile_img || null,
      date_joined: newUser.date_joined,
      last_login: newUser.last_login,
      token
    }
  
    
    return user
  } catch (error) {
    return {
      message: 'Something went wrong',
      errors: [error]
    }
  }

}