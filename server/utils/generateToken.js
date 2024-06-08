import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    code: user.code
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d'
  })
}
