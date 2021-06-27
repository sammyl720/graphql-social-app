const { User } = require("../../models")

module.exports = async (parent, {data}, { user }, info) => {
  try {
    data.last_updated = new Date()
    const db_user = await User.findByIdAndUpdate(user._id, data, { new: true, lean: true })
    // console.log(db_user)
    return {
      status: `Updated profile of ${db_user.name}`
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Something went wrong",
      errors: ["Something went wrong", error.message || '']
    }
  }
}