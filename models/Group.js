const { Schema, ObjectId, model } = require('mongoose')

const GroupSchema = new Schema({
  created_on: {
    type: Date,
    default: Date.now
  },
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  group_image: [{
    type: ObjectId,
    ref: 'Image'
  }],
  public: [{
    type: Boolean,
    default: true
  }]
})

const GroupModel = model('Group', GroupSchema)

module.exports = GroupModel