import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import chatroomRoutes from './routes/chatroomRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import cors from 'cors'

const app = express()

app.disable('x-powered-by')

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', chatroomRoutes)
app.use('/api', messageRoutes)

export default app
