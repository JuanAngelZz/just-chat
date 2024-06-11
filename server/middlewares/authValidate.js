import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const authValidate = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Register required' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: 'Unauthorized' })
    }

    req.user = user
    next()
  })
}
