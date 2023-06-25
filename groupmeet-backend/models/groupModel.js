const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
},
members: {
    type: [],
    required: true,
},
 
})

module.exports = mongoose.model('Group', groupSchema)