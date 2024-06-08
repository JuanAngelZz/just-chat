import { createContext, useContext, useEffect, useState } from 'react'
import {
  createChat,
  createMessage,
  deleteChat,
  getChat,
  getChats,
  updateChat
} from '../api/chat'
import { useAuth } from './authContext'

export const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat must be used within an ChatProvider')
  }

  return context
}

export const ChatProvider = ({ children }) => {
  const [chatrooms, setChatrooms] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [errors, setErrors] = useState([])
  const { user, setCallout } = useAuth()

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    getChatrooms()
  }, [user])

  const getChatrooms = async () => {
    try {
      const res = await getChats()
      setChatrooms(res.data)
      console.log('getChatrooms', res)
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const joinChatroom = async (code) => {
    try {
      const res = await createChat(code)
      console.log('joinChatroom', chatrooms)
      return res.data
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.msg) {
        setErrors([error.response.data.msg])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const getCurrentChat = async (id) => {
    try {
      const res = await getChat(id)
      setCurrentChat(res.data)
      setMessages(res.data.messages)
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const updateChatName = async (id, name) => {
    try {
      await updateChat(id, name)
      getChatrooms()
      setCallout('Chat name updated successfully')
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const leaveChatroom = async (id) => {
    try {
      const res = await deleteChat(id)
      setCurrentChat(null)
      setMessages([])
      getChatrooms()
      console.log('deleteCurrentChat', res)
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const sendMessage = async (message) => {
    try {
      const res = await createMessage(currentChat._id, message)
      console.log('sendMessage', res)
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const addMessage = (message) => {
    setMessages((prevState) => [...prevState, message])
  }

  return (
    <ChatContext.Provider
      value={{
        chatrooms,
        currentChat,
        messages,
        errors,
        addMessage,
        joinChatroom,
        getCurrentChat,
        updateChatName,
        leaveChatroom,
        setChatrooms,
        sendMessage,
        setCurrentChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
