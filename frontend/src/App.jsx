import { LoginForm } from './components/LoginForm.jsx'
import { NotFound } from './components/NotFound.jsx'
import { Register } from './components/Register.jsx'
import { ContainerPrimary } from './layout/ContainerPrimary.jsx'
import { ContainerSecondary } from './layout/ContainerSecondary.jsx'
import {Home} from './pages/Home/Home.jsx'
import { Route,Routes } from 'react-router-dom'


function App() {
  return (
    <div className='bg-(--bg-primary) flex justify-center min-h-screen
     '>
        <Routes>
          <Route path="/" element={<ContainerSecondary><LoginForm /></ContainerSecondary>} />
          <Route path="/home" element={<ContainerPrimary> <Home /></ContainerPrimary>} />
           <Route path="/register" element={<ContainerSecondary><Register /></ContainerSecondary>} />
            <Route path="/*" element={<ContainerSecondary><NotFound /></ContainerSecondary>} />
        </Routes>
    </div>
  )
}

export default App
