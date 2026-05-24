import Button from '../../components/Button'
import Categorias from '../../components/Categorias'
import NavBar from '../../components/NavBar'
import Tasks from '../../components/Tasks'

function HomePage(){
    return( 
    <div>
        <NavBar></NavBar>
        <Button></Button>
        <Categorias></Categorias>
        
        <Tasks></Tasks>
    </div>
    )
    
    
}

export default HomePage