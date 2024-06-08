import axios from "./axios"

export const register = () => axios.post('/register')

export const signin = (user) => axios.post('/signin', user)

export const signup = (user) => axios.put('/signup', user)

export const verify = () => axios.get('/verify')

export const profile = () => axios.get('/profile')

export const changeAvatar = (url) => axios.post('/avatar', { url })

export const logout = () => axios.post('/logout')
