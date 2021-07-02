const { UniqueTypeNamesRule } = require('graphql');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
  asset_id: {
    type:String,
    require: true
  },
  public_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required:true
  },
  secure_url: {
    type: String,
    required: true
  },
  format: {
    type: String
  },
  resource_type:{
    type:String,
  },
  created_at: {
    type:String
  }
})

const ImageModel = mongoose.model('Images', ImageSchema)

module.exports = ImageModel;