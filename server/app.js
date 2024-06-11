import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import chatroomRoutes from './routes/chatroomRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import cors from 'cors'
import { REACT_APP_URL } from './config.js'

const app = express()

app.disable('x-powered-by')

app.use(
  cors({
    origin: REACT_APP_URL,
    credentials: true
  })
)
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', authRoutes)
app.use('/api', chatroomRoutes)
app.use('/api', messageRoutes)

export default app
