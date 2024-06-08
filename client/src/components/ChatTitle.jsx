import { Box, Section, Separator, Text } from '@radix-ui/themes'
import { useChat } from '../contexts/chatContext'
import { useAuth } from '../contexts/authContext'

const ChatTitle = () => {
  const { currentChat } = useChat()
  const { user } = useAuth()
  const userToChat =
    currentChat && currentChat?.users?.find((u) => u._id !== user?.id)
  
  return (
    <>
      <Section p='0' width='100%' m='0' gridColumn={'2 / 7'}>
        <Box px='20px' py='15px'>
          <Text as='h1' size='3' weight='bold'>
            {currentChat?.name}
          </Text>
          <Text as='p' size='2' color='gray'>
            {userToChat?.username}
          </Text>
        </Box>
        <Separator size='4' />
      </Section>
    </>
  )
}

export default ChatTitle
