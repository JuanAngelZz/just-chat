import { Router } from 'express'
import {
  logout,
  profile,
  register,
  signin,
  signup,
  updateAvatar,
  verifyToken
} from '../controllers/authController.js'
import { authValidate } from '../middlewares/authValidate.js'
import {
  validatePartialSchema,
  validateSchema
} from '../middlewares/validateSchema.js'
import { authSchema } from '../schemas/authSchema.js'

const router = Router()

router.post('/register', register)

router.put('/signup', authValidate, validateSchema(authSchema), signup)
router.post('/signin', validatePartialSchema(authSchema), signin)
router.get('/profile/:code', authValidate, profile)
router.get('/verify', verifyToken)
router.post(
  '/avatar',
  authValidate,
  validatePartialSchema(authSchema),
  updateAvatar
)
router.post('/logout', logout)

export default router
