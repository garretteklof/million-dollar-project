const mongoose = require("mongoose");

const ChatSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  messages: [
    {
      message: String,
      timestamp: Date,
      meta: [
        {
          recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          delivered: Boolean,
          read: Boolean
        }
      ]
    }
  ],
  participants: [
    {
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      delivered: Boolean,
      read: Boolean
    }
  ],
  isGroupChat: {
    type: Boolean,
    default: false
  }
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat };
