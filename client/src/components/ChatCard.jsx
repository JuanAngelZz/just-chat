import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Card,
  ContextMenu,
  Dialog,
  Flex,
  Text,
  TextField
} from '@radix-ui/themes'
import { useAuth } from '../contexts/authContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { useChat } from '../contexts/chatContext'
import { useForm } from '../hooks/useForm'
import { socket } from '../api/socket'

const ChatCard = ({ name, users, messages, _id }) => {
  const { user } = useAuth()
  const [alertOpen, setAlertOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { leaveChatroom, updateChatName } = useChat()
  const userToChat = users.find((u) => u.username !== user.username)
  const chatName = name.includes(user.username) ? userToChat.username : name
  const { form, handleChange, resetForm } = useForm({
    name: chatName
  })
  const navigate = useNavigate()

  const lastMessage =
    messages.length > 0
      ? messages[messages.length - 1].text
      : 'Established connection, say hi! 👋'

  const handleEditClick = () => {
    setDialogOpen(true)
    console.log()
  }

  const handleDeleteClick = () => {
    setAlertOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateChatName(_id, form)
    socket.emit('update chat', _id, form.name, user.username)
  }

  const handleDelete = () => {
    leaveChatroom(_id)
    socket.emit('leave chat', _id, name, user.username)
    navigate('/')
  }

  return (
    <Box width='100%'>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Card asChild size='2'>
            <NavLink
              activeClassName='active'
              to={`/chat/${_id}`}
              style={{ cursor: 'pointer', width: '100%' }}
            >
              <Flex gap='4' align='center'>
                <Avatar size='4' radius='full' fallback={chatName[0]} />
                <Box>
                  <Text as='div' weight='bold'>
                    {chatName}
                  </Text>
                  <Text as='div' color='gray'>
                    {lastMessage}
                  </Text>
                </Box>
              </Flex>
            </NavLink>
          </Card>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item
            shortcut={<Pencil1Icon />}
            onSelect={handleEditClick}
          >
            Edit
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item
            shortcut={<TrashIcon />}
            color='red'
            onSelect={handleDeleteClick}
          >
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <span />
        </Dialog.Trigger>

        <Dialog.Content maxWidth='450px'>
          <Dialog.Title>Edit chat</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            Change the name of the chat.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <Flex direction='column' gap='3'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Name
                </Text>
                <TextField.Root
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='Enter chat name'
                />
              </label>
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <Button variant='soft' color='gray' onClick={() => resetForm()}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type='submit'>Save</Button>
              </Dialog.Close>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Trigger asChild>
          <span />
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Delete Chat</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel asChild>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant='solid'
                color='red'
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  )
}

export default ChatCard
