const { User } = require('../../models');
const cookie = require('cookie')
const { minute, week } = require('../../util/time')
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

    const token = jwt.sign({ id: user._id, email}, process.env.JWT_SECRET, { expiresIn: '30m'})
    const last_login = new Date();
    user.last_login = last_login;
    await user.save()

    const expireTime = Date.now() + (30 * minute)
    const refresh_token = jwt.sign({ id: user._id}, process.env.REFRESH_SECRET, { expiresIn: '7 days'})
    const serializedCookie = cookie.serialize('refreshToken', refresh_token, {
      httpOnly: true,
      maxAge: week / 1000, // from ms to second
      sameSite: process.env.NODE_ENV == 'production',
      secure: process.env.NODE_ENV == 'production',
      ...(process.env.NODE_ENV == 'production' && { domain: process.env.WEBSITE })
    })
    ctx.res.cookie('Set-Cookie', serializedCookie)
    return { token, expireTime }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}