const { User } = require('../../models');
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


module.exports = async (parent, { data: { email, password }}, ctx, info) => {
  const errors = []
  if(!email){
    errors.push('Please provide an email')
  }

  if(!password){
    errors.push('Please provide a password')
  }

  if(errors.length > 0){
    return {
      message: errors[0],
      errors
    }
  }

  try {
    console.log(User, 'USER MODEL')
    let user = await User.findOne({ email })
    const isMatch = bcrypt.compareSync(password,user?.password)
    if(!user || !isMatch){
      return {
        message: 'Please provide proper credentials',
        errors: ['Please provide proper credentials']
      }
    }


    const token = jwt.sign({ id: user._id, email}, process.env.JWT_SECRET, { expiresIn: '2 days'})
    const last_login = new Date();
    user.last_login = last_login;
    await user.save()
    const { followers, following, posts, _id:id, name, bio, date_joined, profile_img} = user._doc
    let response = {
      id,
      email,
      name,
      bio: bio || null,
      followers,
      following,
      posts,
      date_joined,
      last_login,
      token,
      profile_img: profile_img || null
    }

    console.log(response)
    
    return response
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}