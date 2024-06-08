import { Flex } from '@radix-ui/themes'
import ChatCard from './ChatCard'
import NewChatDialog from './NewChatDialog'
import { useAuth } from '../contexts/authContext'
import { useChat } from '../contexts/chatContext'
import { useEffect } from 'react'
import { socket } from '../api/socket'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ChatList = () => {
  const { chatrooms, setChatrooms, setCurrentChat, currentChat } = useChat()
  const { user, setCallout } = useAuth()
  const [parent] = useAutoAnimate()

  useEffect(() => {
    const handleNewChat = (data) => {
      if (data.users[0]._id === user?.id || data.users[1]._id === user?.id) {
        setChatrooms((prevState) => [...prevState, data])
      }
    }

    socket.on('new chat', handleNewChat)

    socket.on('update chat', (id, name, user) => {
      if (chatrooms.find((chat) => chat._id === id)) {
        setChatrooms(chatrooms.map((chat) => (chat._id === id ? { ...chat, name } : chat)))
        setCurrentChat({ ...currentChat, name })
        setCallout(`Chat name updated by ${user}`)
      }
    })

    socket.on('leave chat', (id, name, user) => {
      if (chatrooms.find((chat) => chat._id === id)) {
        setChatrooms(chatrooms.filter((chat) => chat._id !== id))
        setCallout(`Chat ${name} has been deleted by ${user}`)
      }
    })

    return () => {
      socket.off('new chat', handleNewChat)
    }
  }, [user, setChatrooms, chatrooms, setCallout])

  return (
    <Flex
      width='100%'
      height='70vh'
      overflow='auto'
      direction='column'
      py='10px'
      gap='10px'
      align='center'
      ref={parent}
    >
      {chatrooms.map((chat) => (
        <ChatCard {...chat} key={chat._id} />
      ))}
      <NewChatDialog />
    </Flex>
  )
}

export default ChatList
