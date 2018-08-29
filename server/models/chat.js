const mongoose = require("mongoose");

const ConvoSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const MessageSchema = new mongoose.Schema({
  convoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Convo"
  },
  content: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  hasSeen: [
    {
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      seenAt: Date
    }
  ]
});

const Convo = mongoose.model("Convo", ConvoSchema);
const Message = mongoose.model("Message", MessageSchema);

module.exports = { Convo, Message };
