const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const listSchema = new Schema({
  role: {
    type: Number,
    default: 0
  },
  desc: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
})
listSchema.plugin(mongoosePaginate)
const List = mongoose.model('List', listSchema, 'lists')

module.exports = List