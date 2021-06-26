const { User } = require("../../models")

module.exports = async (parent, { userId }, { user }, info) => {
  try {
    if(!userId) {
      return {
        message: 'please provide a userId',
        errors: ['please provide a userId']
      }
    }

    const userToUnFollow = await User.findById(userId);
    if(!userToUnFollow){
      return {
        message: 'Could not find user with given id',
        errors: ['Could not find user with given id']
      } 
    }

    const alreadyFollowing = user.following.includes(userToUnFollow._id)
    const alreadyAFollower = userToUnFollow.followers.includes(user._id)
    if(!alreadyFollowing || !alreadyAFollower){
      return {
        message: `You are not following ${userToUnFollow.name}`,
        errors: [`You are not following ${userToUnFollow.name}`]
      } 
    }
    userToUnFollow.followers = userToUnFollow.followers.filter(u => u.toString() != user._id.toString())
    user.following = user.following.filter(u => u.toString() != userToUnFollow._id.toString())
    await userToUnFollow.save()
    await user.save()
    return {
      status: `Successfully unfollowed ${userToUnFollow.name}`
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }
  }
}