const { Schema, model, ObjectId } = require('mongoose');

const PostSchema = new Schema({
  text: {
    type: [String]
  },
  id: ObjectId,
  images: [{
    type: ObjectId,
    ref: 'Image'
  }],
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
  likeCount: {
    type: Number,
    default: 1
  },
  score: {
    type: Number,
    default: 0
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

PostSchema.pre('save', function(next) {
  this.id = this._id
  this.likeCount = this.likes.length
  const now = Date.now()
  const dif = parseInt(((now - this.created_on.getTime()) / 1000) / 60 / 60);
  console.log(dif)
  this.score = Math.floor((10 * this.likeCount) / (dif || 1))

  
  next()
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel