import Button from '../../components/Button'
import Categorias from '../../components/Categorias'
import NavBar from '../../components/NavBar'
import Tasks from '../../components/Tasks'

function HomePage(){
    return( 
    <div>
        <NavBar></NavBar>
        <Categorias></Categorias>
        <Button></Button>
        <Tasks></Tasks>
    </div>
    )
    
    
}

export default HomePage