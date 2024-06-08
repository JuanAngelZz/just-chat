import { Text, Tooltip } from '@radix-ui/themes'
import { useAuth } from '../contexts/authContext'
import { format } from '@formkit/tempo'

const ChatBubble = ({ message, userId, createdAt }) => {
  const { user } = useAuth()

  const alternative =
    userId !== user?.id ? 'chat_text--alternative' : 'chat_text'

  const date = format(createdAt, "MMM D, h:mm a")

  return (
    <Tooltip content={date}>
      <Text as='p' className={alternative}>
        {message}
      </Text>
    </Tooltip>
  )
}

export default ChatBubble
