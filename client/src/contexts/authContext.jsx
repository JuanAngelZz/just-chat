import { createContext, useContext, useEffect, useState } from 'react'
import { profile, register, signin, signup, verify } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [callout, setCallout] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {

    if (token) {
      console.log('verify', token)
      verifyUser()
    } else {
      console.log('create', token)
      createUser()
    }
  }, [token])

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    if (callout) {
      const timer = setTimeout(() => setCallout(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [callout])

  const signInUser = async (data) => {
    try {
      const res = await signin(data)
      localStorage.setItem('token', res.data.token)
      setUser(res.data)
      setIsLoading(false)
      setCallout('Login successful')
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const signUpUser = async (data) => {
    try {
      const res = await signup(data)
      setUser(res.data)
      setIsLoading(false)
      setCallout('Registration successful')
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
      console.log(errors)
    }
  }

  const createUser = async () => {
    try {
      const res = await register()
      localStorage.setItem('token', res.data.token)
      setUser(res.data)
      setIsLoading(false)
      setCallout('User created successfully')
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const verifyUser = async () => {
    try {
      const res = await verify()
      console.log(res)
      setUser(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const getUser = async () => {
    try {
      const res = await profile()
      setUser(res.data)
      setIsLoading(false)
    } catch (error) {
      if (error.response.data.message) {
        setErrors([error.response.data.message])
      } else {
        setErrors(error.response.data)
      }
    }
  }

  const logoutUser = async () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInUser,
        signUpUser,
        createUser,
        verifyUser,
        getUser,
        logoutUser,
        errors,
        isLoading,
        callout,
        setCallout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

