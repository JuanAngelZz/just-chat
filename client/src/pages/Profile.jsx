import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Section,
  Separator,
  Spinner,
  Switch,
  Text
} from '@radix-ui/themes'
import { useAuth } from '../contexts/authContext'
import { useUserTheme } from '../contexts/themeContext'
import Sign from '../components/Sign'
import ColorPicker from '../components/ColorPicker'
import { useMediaQuery } from 'react-responsive'

const Profile = () => {
  const { user, isLoading, logoutUser } = useAuth()
  const { userTheme, toggleTheme } = useUserTheme()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return isLoading ? (
    <Section gridColumn='2 / 7' gridRow={'1 / 6 '}>
      <Flex gap='4' direction='column' justify='center' align='center'>
        <Spinner size='3' />
      </Flex>
    </Section>
  ) : (
    <>
      <Section pb='40px' gridColumn='2 / 7' gridRow={'1 / 6'}>
        <Flex gap='4' direction='column' justify='center' align='center'>
          <Avatar size='9' radius='full' fallback={user.username[0]} />
          <Text weight='bold'>
            {user.username}
            <Badge ml='10px' color={user.signed ? 'green' : 'red'}>
              {user.signed ? 'Signed' : 'Not Signed'}
            </Badge>
          </Text>
          {user.signed ? (
            <Button onClick={logoutUser}>Logout</Button>
          ) : (
            <Sign />
          )}
        </Flex>
      </Section>
      <Flex
        px='40px'
        direction='column'
        gap='4'
        align='center'
        gridColumn='2 / 7'
        gridRow='6 / 10'
      >
        {isMobile ? (
          <Card>
            <Flex p='20px' direction='column' justify='between' align='center' gap='3'>
              <Text size='2'>
                My Code: <strong>{user.code}</strong>
              </Text>
              <Separator orientation='horizontal' size='3' />
              <Text as='label' size='2'>
                <Flex gap='2'>
                  Night mode:{' '}
                  <Switch
                    size='2'
                    onClick={toggleTheme}
                    defaultChecked={userTheme.appearance === 'dark'}
                  />
                </Flex>
              </Text>
              <Separator orientation='horizontal' size='3' />
              <ColorPicker />
            </Flex>
          </Card>
        ) : (
          <Card>
            <Flex p='20px' justify='between' align='center' gap='3'>
              <Text size='3'>
                My Code: <strong>{user.code}</strong>
              </Text>
              <Separator orientation='vertical' size='2' /> 
              <Text as='label' size='3'>
                <Flex gap='2'>
                  Night mode:{' '}
                  <Switch
                    size='2'
                    onClick={toggleTheme}
                    defaultChecked={userTheme.appearance === 'dark'}
                  />
                </Flex>
              </Text>
              <Separator orientation='vertical' size='2' />
              <ColorPicker />
            </Flex>
          </Card>
        )}
        {/* <Section>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color='red'>Delete Account</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth='450px'>
              <AlertDialog.Title>Delete Account</AlertDialog.Title>
              <AlertDialog.Description size='2'>
                Are you sure you want to delete your account?
                <br />
                This action cannot be undone.
              </AlertDialog.Description>

              <Flex gap='3' mt='4' justify='end'>
                <AlertDialog.Cancel>
                  <Button variant='soft' color='gray'>
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant='solid' color='red'>
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Section> */}
      </Flex>
    </>
  )
}

export default Profile
