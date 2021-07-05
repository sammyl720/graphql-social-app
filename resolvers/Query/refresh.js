const cookie = require('cookie');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { minute, week } = require('../../util/time');

module.exports = async (parents, args, ctx) => {
  try {
    // console.log(ctx.req.cookies, 'cookies', ctx.req.headers.cookie)
    const { refreshToken } = cookie.parse(ctx.req.headers.cookie || '')
    if(refreshToken) {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
      const { id } = payload;
      const user = await User.findById(id)
      if(!user) {
        throw new Error('User not found');
      }
      const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '15m'})
      const expireTime = Date.now() + (15 * minute)
      return {
        token,
        expireTime
      }
      
    } else {
      throw new Error('Access Denied: Unauthorized')
    }
  } catch (error) {

    return {
      errors: [error.message],
      message: error.message,
      code: 401
    }
  }
}