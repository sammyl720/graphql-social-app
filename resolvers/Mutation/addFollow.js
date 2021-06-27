const { User } = require("../../models")

module.exports = async (parent, { userId }, { user }, info) => {
  try {
    if(!userId) {
      return {
        message: 'please provide a userId',
        errors: ['please provide a userId']
      }
    }

    
    const userToApprove = await User.findById(userId);
    if(!userToApprove){
      return {
        message: 'Could not find user with given id',
        errors: ['Could not find user with given id']
      } 
    } else if(userToApprove._id.toString() == user._id.toString()){
      return {
        message: 'You can not follow your self.',
        errors: ['You can not follow your self.']
      } 
    }

    const requested = user.requests.includes(userToApprove._id);

    if(!requested){
      return {
        message: 'User did not request to follow you',
        errors: ['User did not request to follow you']
      } 
    } else {
      user.requests = user.requests.filter(u => u.toString() != userToApprove._id.toString())
    }


    // const alreadyFollowing = user.following.includes(userToApprove._id)
    const alreadyAFollower = user.followers.includes(userToApprove._id)
    if(alreadyAFollower){
      return {
        message: `${userToApprove.name} is already a follower of yours`,
        errors: [`${userToApprove.name} is already a follower of yours`]
      } 
    }
    // userToApprove.followers.push(user._id)
    userToApprove.following.push(user._id)
    // user.following.push(userToApprove._id)
    user.followers.push(userToApprove._id)
    await userToApprove.save()
    await user.save()
    return {
      status: `Successfully following ${userToApprove.name}`
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
      errors: [error.message || '', 'Something went wrong']
    }
  }
}