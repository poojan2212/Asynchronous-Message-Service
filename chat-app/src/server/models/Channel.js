/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/server/models/Channel.js

const mongoose = require('mongoose')

const channelSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
})

channelSchema.pre('save', function (next) {
  this.name = this.name.toLowerCase()

  next()
})

module.exports = mongoose.model('Channel', channelSchema)
