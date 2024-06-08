import { Router } from 'express'
import {
  deleteMessage,
  getMessage,
  getMessages,
  postMessage,
  updateMessage
} from '../controllers/messageController.js'
import { authValidate } from '../middlewares/authValidate.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { messageSchema } from '../schemas/messageSchema.js'

const router = Router()

router.get('/chats/:chatId/messages', authValidate, getMessages)
router.post(
  '/chats/:chatId/messages',
  authValidate,
  validateSchema(messageSchema),
  postMessage
)

router.get('/chats/:chatId/messages/:messageId', authValidate, getMessage)
router.put(
  '/chats/:chatId/messages/:messageId',
  authValidate,
  validateSchema(messageSchema),
  updateMessage
)
router.delete('/chats/:chatId/messages/:messageId', authValidate, deleteMessage)

export default router
