require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = ({ req }) => {
  const { authorization } = req.headers
  if(!authorization) return null
  const token = authorization.split(' ')[1]
  if(!token) return null
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return payload
  } catch (error) {
    console.log(error)
    return null
  }
}