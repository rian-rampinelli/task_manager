import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import './styles/globals.css'
import { CategoryProvider } from './contexts/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoryProvider>
           <App />
        </CategoryProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
