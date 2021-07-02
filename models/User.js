const { Schema, model, ObjectId } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  last_update: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  bio: {
    type: String
  },
  gender: {
    type: String,
  },
  private: {
    type: Boolean,
    default: false
  },
  profile_img: {
    type: ObjectId,
    ref: 'Image'
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  requests: [{
    type: ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
  liked: [{
    type: ObjectId,
    ref: 'Post'
  }]
})

const UserModel = model('User', UserSchema);


module.exports = UserModel