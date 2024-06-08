import { Router } from 'express'
import {
  createChatroom,
  deleteChatroom,
  getChatroom,
  getChatrooms,
  updateChatroom
} from '../controllers/chatroomController.js'
import { authValidate } from '../middlewares/authValidate.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { chatroomSchema } from '../schemas/chatroomSchema.js'

const router = Router()

router.get('/chats', authValidate, getChatrooms)
router.post('/chats/:userCode', authValidate, createChatroom)

router.get('/chats/:chatId', authValidate, getChatroom)
router.put(
  '/chats/:chatId',
  authValidate,
  validateSchema(chatroomSchema),
  updateChatroom
)
router.delete('/chats/:chatId', authValidate, deleteChatroom)

export default router
