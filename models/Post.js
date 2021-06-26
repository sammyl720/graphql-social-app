const { Schema, model, ObjectId } = require('mongoose');

const PostSchema = new Schema({
  text: {
    type: String
  },
  id: ObjectId,
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

PostSchema.pre('save', function(next) {
  this.id = this._id
  next()
})

PostSchema.pre('find', function(next){
  next()
})
PostSchema.post('find', async function(docs) {
  for(let doc of docs) {
    
    doc.id = doc._id.toString()
    if(doc.public){
      await doc.populate('user likes').execPopulate()
    } else {
      await doc.populate('likes').execPopulate()
    }
  }
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel