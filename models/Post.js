const { Schema, model, ObjectId } = require('mongoose');

const PostSchema = new Schema({
  text: {
    type: String
  },
  images: [String],
  created_on: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  public: {
    type: Boolean,
    default: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  hash_tags: [String],
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }]
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel