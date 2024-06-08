import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField
} from '@radix-ui/themes'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../contexts/authContext'
import { Cross2Icon } from '@radix-ui/react-icons'

const SignIn = () => {
  const { form, handleChange } = useForm({
    email: '',
    password: ''
  })

  const { signInUser, errors } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    signInUser(form)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant='outline'>Sign in</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>Sign in</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Login to your account.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction='column' gap='3'>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Email
              </Text>
              <TextField.Root
                name='email'
                placeholder='Enter your email'
                type='email'
                required
                value={form.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Password
              </Text>
              <TextField.Root
                name='password'
                placeholder='Enter your password'
                type='password'
                required
                value={form.password}
                onChange={handleChange}
              />
            </label>
          </Flex>

          {errors.length > 0 && (
            <Callout.Root mt='4' variant='soft' color='red'>
              <Callout.Icon><Cross2Icon /></Callout.Icon>
              {errors.map((error, i) => (
                <Callout.Text key={i}>{error}</Callout.Text>
              ))}
            </Callout.Root>
          )}

          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Button type='submit'>Save</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SignIn
