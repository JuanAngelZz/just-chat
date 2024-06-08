import { Flex, Separator, Spinner } from '@radix-ui/themes'
import { slide as Menu } from 'react-burger-menu'
import { useMediaQuery } from 'react-responsive'
import UserSection from './UserSection'
import ChatList from './ChatList'
import { useAuth } from '../contexts/authContext'

const Nav = () => {
  const { isLoading } = useAuth()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  
  return isLoading ? <Spinner size='3' /> : (
    <Flex direction='column' align='center' gridRow={'1 / 10'}>
      {isMobile ? (
        <Menu>
          <UserSection />
          <Separator size='4' />
          <ChatList />
        </Menu>
      ) : (
        <>
          <UserSection />
          <Separator size='4' />
          <ChatList />
        </>
      )}
    </Flex>
  )
}

export default Nav
