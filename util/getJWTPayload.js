
const jwt = require('jsonwebtoken')
module.exports = ({ req }) => {
  // console.log(req.headers)
  const { authorization } = req.headers
  if(!authorization) return null
  const token = authorization.split(' ')[1]
  if(!token) return null
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  // console.log('unwrapping payload', payload)
  return payload
}