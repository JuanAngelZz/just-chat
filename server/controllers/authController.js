import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateRandomUsername } from '../utils/generateRandomUsername.js'
import { generateToken } from '../utils/generateToken.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, REACT_APP_DOMAIN } from '../config.js'

export const register = async (req, res) => {
  try {
    const code = Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('')
    const randomUsername = generateRandomUsername()
    const randomPassword = Math.random().toString(36).substring(7)

    const hashedPassword = await bcrypt.hash(randomPassword, 10)

    const newUser = new User({
      username: randomUsername,
      password: hashedPassword,
      email: randomUsername + '@gmail.com',
      code
    })

    const savedUser = await newUser.save()

    const token = generateToken(savedUser)

    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      domain: REACT_APP_DOMAIN,
      sameSite: 'None'
    })

    return res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      code: savedUser.code,
      signed: savedUser.signed
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const body = { username, email, password: hashedPassword, signed: true }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, body, {
      new: true
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  console.log(password, email)

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(404).json({ message: 'User not found with this email' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' })
    }

    const token = generateToken(userFound)

    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      domain: REACT_APP_DOMAIN,
      sameSite: 'None'
    })

    const user = {
      username: userFound.username,
      email: userFound.email,
      signed: userFound.signed,
      code: userFound.code,
      avatar: userFound.avatar
    }

    res.status(200).json(user)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(400).json({ message: error.message })
  }
}

export const profile = async (req, res) => {
  const { code } = req.params

  try {
    const userFound = await User.findOne({ code })

    const user = {
      id: userFound._id,
      username: userFound.username,
      code: userFound.code,
      avatar: userFound.avatar
    }

    res.status(200).json(user)
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found with this code' })
    }
    res.status(404).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    try {
      const userFound = await User.findById(data.id)

      if (!userFound) {
        return res.status(404).json({ message: 'User not found' })
      }

      const user = {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        signed: userFound.signed,
        code: userFound.code,
        avatar: userFound.avatar
      }

      return res.json(user)
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(404).json({ message: error.message })
    }
  })
}

export const updateAvatar = async (req, res) => {
  const { avatar } = req.body
  try {
    await User.findByIdAndUpdate(req.user.id, { avatar }, { new: true })
    res.status(200).json({ avatar })
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(404).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    maxAge: 1
  })
  res.sendStatus(200)
}
