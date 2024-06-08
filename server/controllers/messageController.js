import Chatroom from '../models/chatroom.js'
import Message from '../models/message.js'

export const getMessages = async (req, res) => {
  const { chatId } = req.params

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    const messages = await Message.find({ chatroom: chatId })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const getMessage = async (req, res) => {
  const { messageId, chatId } = req.params

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    const message = await Message.findById(messageId)

    res.status(200).json(message)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const postMessage = async (req, res) => {
  const { chatId } = req.params
  const { text, audio, document } = req.body

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    const newMessage = new Message({
      user: req.user.id,
      chatroom: chatroom._id,
      text,
      audio,
      document
    })

    await newMessage.save()

    if (chatroom.messages.length > 100) {
      chatroom.messages.shift()
      chatroom.messages.push(newMessage._id)
    } else {
      chatroom.messages.push(newMessage._id)
    }

    await chatroom.save()

    res.status(200).json(newMessage)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const updateMessage = async (req, res) => {
  const { messageId, chatId } = req.params
  const { text } = req.body

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    const message = await Message.findByIdAndUpdate(
      messageId,
      { text },
      { new: true }
    )

    res.status(200).json(message)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom or message not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const deleteMessage = async (req, res) => {
  const { messageId, chatId } = req.params

  try {
    const chatroom = await Chatroom.findById(chatId)

    if (!chatroom.users.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    await Message.findByIdAndDelete(messageId)

    chatroom.messages = chatroom.messages.filter(
      (message) => message.toString() !== messageId
    )
    await chatroom.save()

    res.sendStatus(204)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Chatroom or message not found' })
    }
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
