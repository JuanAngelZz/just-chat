import app from './app.js'
import { PORT, REACT_APP_URL } from './config.js'
import { connectDB } from './db.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env'
})
connectDB()

const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 5 * 60 * 1000
  },
  cors: {
    origin: 'https://just-chat-io.vercel.app',
    credentials: true
  }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

io.on('connection', (socket) => {
  console.log('A user connected!')

  socket.on('joinRoom', (chatId) => {
    socket.join(chatId)
  })

  socket.on('new chat', (data) => {
    io.emit('new chat', data)
  })

  socket.on('update chat', (id, name, user) => {
    io.emit('update chat', id, name, user)
  })

  socket.on('leave chat', (id, name, user) => {
    io.emit('leave chat', id, name, user)
  })

  socket.on('chat message', async (data) => {
    io.to(data.chatId).emit('chat message', data)
  })

  socket.on('disconnect', () => console.log('A user disconnected...'))
})
