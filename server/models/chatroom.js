import mongoose from 'mongoose'
import Message from './message.js'

const chatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      validate: {
        validator: (users) => users.length === 2,
        message: 'Chatroom must have exactly 2 users'
      }
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
  },
  {
    timestamps: true
  }
)

chatroomSchema.pre('deleteOne', { document: true }, async function (next) {
  const chatroom = this
  await Message.deleteMany({ chatroom: chatroom._id })
  next()
})

const Chatroom = mongoose.model('Chatroom', chatroomSchema)

export default Chatroom
