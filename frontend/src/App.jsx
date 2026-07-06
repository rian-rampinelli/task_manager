import { LoginForm } from './components/LoginForm.jsx'
import { Register } from './components/Register.jsx'
import { ContainerHome } from './layout/ContainerHome.jsx'
import { ContainerLogin } from './layout/ContainerLogin.jsx'
import {Home} from './pages/Home/Home.jsx'
import { Route,Routes } from 'react-router-dom'


function App() {
  return (
    <div className='bg-(--bg-primary) flex justify-center 
     '>
        <Routes>
          <Route path="/" element={<ContainerLogin><LoginForm /></ContainerLogin>} />
          <Route path="/home" element={<ContainerHome> <Home /></ContainerHome>} />
           <Route path="/register" element={<ContainerLogin><Register /></ContainerLogin>} />
        </Routes>
    </div>
  )
}

export default App
