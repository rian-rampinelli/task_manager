import Categorias from '../../components/Categorias.jsx'
import Header from '../../components/Header.jsx'
import CreateTasks from '../../components/CreateTask.jsx'
import Footer from '../../components/Footer.jsx'
import "./Home.css"



function Home(){

    return ( 
    <div id='container' >
        <div className="flex justify-between items-center  flex-wrap mt-16">
        <Header></Header>
        <CreateTasks></CreateTasks>
        </div>
    
        <main className='flex-1'>
            <Categorias></Categorias>
        </main>

        <Footer></Footer>    
    </div>
    )
    
    
}

export default Home
