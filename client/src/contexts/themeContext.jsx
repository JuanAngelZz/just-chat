import { createContext, useContext, useEffect, useState } from 'react'

const UserThemeContext = createContext()

export const useUserTheme = () => {
  const context = useContext(UserThemeContext)

  if (!context) {
    throw new Error('useUserTheme must be used within a UserThemeProvider')
  }

  return context
}

export const UserThemeProvider = ({ children }) => {
  const [userTheme, setUserTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme
      ? JSON.parse(storedTheme)
      : { appearance: 'light', accentColor: 'indigo' }
  })

  const toggleTheme = () => {
    setUserTheme((prevTheme) => ({
      ...prevTheme,
      appearance: prevTheme.appearance === 'light' ? 'dark' : 'light'
    }))
  }

  const setAccentColor = (color) => {
    setUserTheme((prevTheme) => ({
      ...prevTheme,
      accentColor: color
    }))
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(userTheme))
  }, [userTheme])

  return (
    <UserThemeContext.Provider
      value={{ userTheme, toggleTheme, setAccentColor }}
    >
      {children}
    </UserThemeContext.Provider>
  )
}
