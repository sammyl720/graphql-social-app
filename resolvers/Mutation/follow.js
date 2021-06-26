const { User } = require("../../models")

module.exports = async (parent, { userId }, { user }, info) => {
  try {
    if(!userId) {
      return {
        message: 'please provide a userId',
        errors: ['please provide a userId']
      }
    }

    const userToFollow = await User.findById(userId);
    if(!userToFollow){
      return {
        message: 'Could not find user with given id',
        errors: ['Could not find user with given id']
      } 
    } else if(userToFollow._id.toString() == user._id.toString()){
      return {
        message: 'You can not follow your self.',
        errors: ['You can not follow your self.']
      } 
    }

    const alreadyFollowing = user.following.includes(userToFollow._id)
    const alreadyAFollower = userToFollow.followers.includes(user._id)
    if(alreadyAFollower || alreadyFollowing){
      return {
        message: `You are already following ${userToFollow.name}`,
        errors: [`You are already following ${userToFollow.name}`]
      } 
    }
    userToFollow.followers.push(user._id)
    user.following.push(userToFollow._id)
    await userToFollow.save()
    await user.save()
    return {
      status: `Successfully following ${userToFollow.name}`
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }
  }
}