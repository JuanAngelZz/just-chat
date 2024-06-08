import { AuthProvider } from './contexts/authContext'
import { Grid, Container, Theme } from '@radix-ui/themes'
import ChatTitle from './components/ChatTitle'
import ChatArea from './components/ChatArea'
import { ChatProvider } from './contexts/chatContext'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Profile from './pages/Profile'
import { useUserTheme } from './contexts/themeContext'
import AppCallout from './components/AppCallout'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Nav from './components/Nav'

function App() {
  const { userTheme } = useUserTheme()
  const [parent] = useAutoAnimate()

  return (
    <Theme
      appearance={userTheme.appearance}
      accentColor={userTheme.accentColor}
      grayColor='mauve'
    >
      <AuthProvider>
        <ChatProvider>
          <main ref={parent}>
            <AppCallout />
            <Container>
              <Grid
                height='100vh'
                width='100%'
                columns='repeat(5, 1fr)'
                rows='repeat(9, 1fr)'
                py='15px'
                px='10px'
              >
                <Nav />
                <Routes>
                  <Route path='/' element={<About />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route
                    path='/chat/:chatId'
                    element={
                      <>
                        <ChatTitle />
                        <ChatArea />
                      </>
                    }
                  />
                </Routes>
              </Grid>
            </Container>
          </main>
        </ChatProvider>
      </AuthProvider>
    </Theme>
  )
}

export default App
