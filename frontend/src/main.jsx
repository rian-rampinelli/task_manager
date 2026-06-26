import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LoginProvider } from './contexts/LoginContext.jsx'
import './styles/globals.css'
import { CategoryProvider } from './contexts/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <CategoryProvider>
         <App />
      </CategoryProvider>
    </LoginProvider>
  </StrictMode>,
)
