import axios from './axios'

export const getChat = (id) => axios.get(`/chats/${id}`)

export const getChats = () => axios.get('/chats')

export const createChat = (userCode) => axios.post(`/chats/${userCode}`)

export const deleteChat = (id) => axios.delete(`/chats/${id}`)

export const updateChat = (id, chatName) => axios.put(`/chats/${id}`, chatName)

export const createMessage = (chatId, message) =>
  axios.post(`/chats/${chatId}/messages`, { text: message })
