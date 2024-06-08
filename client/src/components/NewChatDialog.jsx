import {
  Dialog,
  Flex,
  IconButton,
  TextField,
  Button,
  Callout
} from '@radix-ui/themes'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../contexts/chatContext'
import { socket } from '../api/socket'
import { useForm } from '../hooks/useForm'
import { useState } from 'react'

const NewChatDialog = () => {
  const { form, handleChange } = useForm({
    code: ''
  })
  const navigate = useNavigate()
  const { joinChatroom, errors } = useChat()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSubmit = async (e, code) => {
    e.preventDefault()

    try {
      const chatroom = await joinChatroom(code)
      socket.emit('new chat', chatroom)
      navigate(`/chat/${chatroom._id}`)
      setDialogOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <IconButton style={{ cursor: 'pointer' }} size='3' radius='full'>
          <PlusIcon onClick={() => setDialogOpen(true)} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth='450px'>
        <Dialog.Title>Enter a new chat</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Please enter the code of the user you want to start a chat with
          <br />
        </Dialog.Description>

        <form onSubmit={(e) => handleSubmit(e, form.code)}>
          <Flex direction='column' gap='3'>
            <TextField.Root
              name='code'
              placeholder='123456'
              type='number'
              required
              value={form.code}
              onChange={handleChange}
            />
          </Flex>

          {errors.length > 0 && (
            <Callout.Root mt='4' variant='soft' color='red'>
              <Callout.Icon>
                <Cross2Icon />
              </Callout.Icon>
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

export default NewChatDialog
