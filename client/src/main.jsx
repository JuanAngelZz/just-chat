import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserThemeProvider } from './contexts/themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserThemeProvider>
      <App />
    </UserThemeProvider>
  </BrowserRouter>
)
