import Chatroom from '../models/chatroom.js'
import User from '../models/user.js'

export const getChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ users: { $in: [req.user.id] } })
      .populate({
        path: 'users',
        select: 'username avatar _id'
      })
      .populate('messages')
    res.status(200).json(chatrooms)
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const getChatroom = async (req, res) => {
  const { chatId } = req.params

  try {
    const chatroom = await Chatroom.findById(chatId).populate('messages')

    if (!chatroom) {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    await chatroom.populate({
      path: 'users',
      select: 'username avatar _id'
    })

    res.status(200).json(chatroom)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const createChatroom = async (req, res) => {
  const { userCode } = req.params

  if (req.user.code === userCode) {
    return res.status(400).json({ msg: 'You cannot chat with yourself' })
  }

  try {
    const userToChat = await User.findOne({ code: userCode })

    if (!userToChat) {
      return res.status(404).json({ msg: 'User not found with that code' })
    }

    const chatroom = new Chatroom({
      name: `${req.user.username} and ${userToChat.username}`,
      users: [req.user.id, userToChat._id]
    })

    let savedChatroom = await chatroom.save()

    savedChatroom = await savedChatroom.populate({
      path: 'users',
      select: 'username avatar _id'
    })

    res.status(200).json(savedChatroom)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const updateChatroom = async (req, res) => {
  const { chatId } = req.params
  const { name } = req.body

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    chatroom.name = name
    await chatroom.save()

    const updatedChatroom = await Chatroom.findById(chatId).populate({
      path: 'users',
      select: 'username avatar _id'
    })

    res.status(200).json(updatedChatroom)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const deleteChatroom = async (req, res) => {
  const { chatId } = req.params

  try {
    const chatroom = await Chatroom.findOne({
      _id: chatId,
      users: { $in: [req.user.id] }
    })

    if (!chatroom) {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }

    await chatroom.deleteOne()

    res.sendStatus(204)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
