import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chatroom'
    },
    text: {
      type: String
    },
    audio: {
      type: String
    },
    document: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
