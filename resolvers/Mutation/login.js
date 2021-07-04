const { User } = require('../../models');
const cookie = require('cookie')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { isEmail } = require('../../util/rgx');

module.exports = async (parent, { data: { email, password }}, ctx, info) => {
  const errors = []
  if(!email){
    errors.push('Please provide an email')
  }

  if(!password){
    errors.push('Please provide a password')
  }
  if(!isEmail(email)){
    errors.push('Please provide a valid email')
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
    if(!user){
      return {
        message: 'Please provide proper credentials',
        errors: ['Please provide proper credentials']
      }
    }

    const isMatch = bcrypt.compareSync(password,user?.password)
    if(!isMatch){
      return {
        message: 'Please provide proper credentials',
        errors: ['Please provide proper credentials']
      }
    }

    const token = jwt.sign({ id: user._id, email}, process.env.JWT_SECRET, { expiresIn: '2m'})
    const last_login = new Date();
    user.last_login = last_login;
    await user.save()
    return {token}
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}