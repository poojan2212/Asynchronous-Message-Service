/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/


const mongoose = require("mongoose");

const privateChatSchema = mongoose.Schema({
  timestamp: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  msg: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  fromUser: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

// privateChatSchema.pre("save", function(next) {
//   this.channel = this.channel.toLowerCase();
//   this.user = this.user.toLowerCase();

//   next();
// });

module.exports = mongoose.model("PrivateChat", privateChatSchema);
