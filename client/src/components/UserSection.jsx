import { CheckCircledIcon, ClipboardCopyIcon, GearIcon } from '@radix-ui/react-icons'
import { Avatar, Badge, Section, Strong, Text, Tooltip } from '@radix-ui/themes'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const UserSection = () => {
  const [clipboard, setClipboard] = useState(false)
  const copyTimeout = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    return () => {
      clearTimeout(copyTimeout.current)
    }
  }, [])

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setClipboard(true)
    copyTimeout.current = setTimeout(() => setClipboard(false), 2000)
  }

  return (
    <Section size='2' pb='2' width='100%' style={{ textAlign: 'center' }}>
      <Avatar size='6' fallback={user?.username[0]} radius='full' mb='12px' />
      <Text as='p' size='3' weight='bold'>
        {user?.username}{' '}
        <Link to='/profile' style={{ cursor: 'pointer' }}>
          <GearIcon style={{ position: 'relative', top: '2px' }} />
        </Link>
      </Text>
      <Tooltip content='Copy and send it to a friend'>
        <Badge my='10px' radius='full' size='3'>
          <Text>
            My code: <Strong>{user?.code}</Strong>
            <button
              onClick={() => copyToClipboard(user?.code)}
              className='clipboard'
            >
              {clipboard ? (
                <CheckCircledIcon color='green' />
              ) : (
                <ClipboardCopyIcon />
              )}
            </button>
          </Text>
        </Badge>
      </Tooltip>
    </Section>
  )
}

export default UserSection
