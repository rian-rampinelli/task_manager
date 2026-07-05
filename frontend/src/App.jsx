import { LoginForm } from './components/LoginForm.jsx'
import { Register } from './components/Register.jsx'
import {Home} from './pages/Home/Home.jsx'
import { Route,Routes } from 'react-router-dom'


function App() {
  return (
    <div className='bg-(--bg-primary) flex items-center justify-center w-full '>
       <div className='w-full max-w-[400px] h-screen flex items-center justify-center'>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
           <Route path="/register" element={<Register />} />
        </Routes>
       </div>
    </div>
  )
}

export default App
