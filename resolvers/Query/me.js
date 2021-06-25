const { User } = require("../../models")

module.exports = async(parent, args, { payload}) => {
  const errors = []
  if(!payload ||!payload.id){
    errors.push('Please provide a token in the authorization header -> Bearer <TOKEN>')
    return {
      message: 'Login first to get token',
      errors
    }
  }
  
  try {
    const { id } = payload
    const dbUser = await User.findById(id).populate('posts followers following')
    if(!dbUser){
      return {
        message: 'Couldn\'t retrieve user',
        errors: ["Couldn't retrieve user from database"]
      }
    }

    const { followers, following, posts, name, bio, date_joined, profile_img, last_login, email} = dbUser._doc
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
      profile_img: profile_img || null
    }
    return response;
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: ['Something went wrong']
    }
  }
}