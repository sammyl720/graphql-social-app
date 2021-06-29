const { Schema, model, ObjectId } = require('mongoose');

const PostSchema = new Schema({
  text: {
    type: [String]
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
  next()
})

PostSchema.pre('find', function(next){
  next()  
})

PostSchema.post('find', async function(docs) {
  for(let doc of docs) {
    const created_on = new Date(doc.created_on)
    const now = Date.now()
    const dif = parseInt(((now - created_on.getTime()) / 1000) / 60 / 60);
    // console.log(`${doc._id} created ${dif} hours ago`)
    docs.hours_ago = dif;
    doc.id = doc._id.toString()
    // console.log(doc.id, dif)
    doc.score = Math.floor((doc.likeCount || 1) / (dif))
    // console.log(`${doc.likeCount} / ${dif} = 'Score`)
    await doc.save()
    console.log(doc.score)
    // console.log(doc)
    if(doc.public){
      await doc.populate('likes').execPopulate()
    } else {
      await doc.populate('likes').execPopulate()
    }
  }
})


const PostModel = model('Post', PostSchema)

module.exports = PostModel