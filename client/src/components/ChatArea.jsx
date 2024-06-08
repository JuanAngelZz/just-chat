import { Flex, IconButton, Text, TextField } from '@radix-ui/themes'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import ChatBubble from './ChatBubble'
import { useChat } from '../contexts/chatContext'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../api/socket.js'
import { useAuth } from '../contexts/authContext.jsx'

const ChatArea = () => {
  const { chatId } = useParams()
  const { getCurrentChat, messages, addMessage, sendMessage } = useChat()
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    getCurrentChat(chatId)
  }, [chatId, getCurrentChat])

  useEffect(() => {
    const handleChatMessage = (data) => {
      if (data.chatId === chatId) {
        addMessage(data)
      }
    }

    socket.emit('joinRoom', chatId)

    socket.on('chat message', handleChatMessage)

    return () => {
      socket.off('chat message', handleChatMessage)
    }
  }, [chatId, addMessage])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim()) {
      sendMessage(message.trim())
      socket.emit('chat message', {
        text: message.trim(),
        user: user?.id,
        chatId: chatId
      })
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Flex
      direction='column'
      gridRow={'2 / 11'}
      gridColumn={'2 / 7'}
      className='chat'
    >
      <Flex
        direction='column'
        height='80vh'
        gap='8px'
        overflow='auto'
        width='100%'
        p='20px'
      >
        {messages.length > 0 ? (
          messages.map(({ text, user, createdAt }, index) => (
            <ChatBubble
              key={index}
              message={text}
              userId={user}
              createdAt={createdAt}
            />
          ))
        ) : (
          <Text align='center' color='gray'>
            No messages yet
          </Text>
        )}
        <div ref={messagesEndRef} />
      </Flex>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField.Root
          radius='full'
          placeholder='Type the message…'
          mt='10px'
          size='3'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          <TextField.Slot>{'>'}</TextField.Slot>
          <TextField.Slot>
            <IconButton size='1' variant='ghost'>
              <PaperPlaneIcon />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </form>
    </Flex>
  )
}

export default ChatArea
