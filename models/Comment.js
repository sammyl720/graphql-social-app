const { Schema, model, ObjectId } = require('mongoose');

const CommentSchema = new Schema({
  text: {
    type: [String],
    required: true
  },
  public: {
    type: Boolean,
    default: true
  },
  images: [{
    type: ObjectId,
    ref: 'Image'
  }],
  user: {
    type: ObjectId,
    ref: 'User'
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  hash_tags: [String]
})

const CommentModel = model('Comment', CommentSchema);
module.exports = CommentModel