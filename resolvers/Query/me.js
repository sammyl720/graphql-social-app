const { User } = require("../../models")

module.exports = async(parent, args, { user }) => {
  try {
    const { followers, following, posts, name, bio, date_joined, profile_img, last_login, email, _id} = user._doc
    let response = {
      id: _id.toString(),
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