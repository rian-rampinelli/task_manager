import Categorias from '../../components/Categorias.jsx'
import Header from '../../components/Header.jsx'
import CreateTasks from '../../components/CreateTask.jsx'
import { useState} from 'react'
import {getCategorys,createCategory,deleteCategory} from "../../api/category.js"
import {getTasksByCategory} from "../../api/category.js"
import "./Home.css"
import Footer from '../../components/Footer.jsx'


function Home(){
    
    const [categorias,setCategorias] = useState([])
    const [tasks,setTasks] = useState([])
    const [idCategory, setIdCategory] = useState(196)

    async function loadCategorys() {
    const data = await getCategorys()
    setCategorias(data)
    }

    async function loadTasks(idCategory){
    const data = await getTasksByCategory(idCategory)
    setTasks(data)

    }
     
    async function handleCreateCategory(nameCategory,emojiCategory,descriptionCategory,idUser) {
    await createCategory({
        name: nameCategory,
        emoji: emojiCategory,
        description: descriptionCategory,
        idUser: idUser,
    })
    loadCategorys()
    }

    async function handleDeleteCategory(id) {
        await deleteCategory(id)
        await loadCategorys()
        await loadTasks(id)
    }

    return ( 
    <div id='container' >
        <div className="flex justify-between items-center  flex-wrap mt-16">
        <Header></Header>
        <CreateTasks
        categorys={categorias}
        idCategory={idCategory}
        loadTasks={loadTasks}
        tasks={tasks}
        setTasks={setTasks}
        >
        </CreateTasks>
        </div>
        
        <main className='flex-1'>
            <Categorias
            categorias ={categorias}
            createCategory={handleCreateCategory}
            deleteCategory={handleDeleteCategory}
            loadCategorys={loadCategorys}
            selectCategory={idCategory}
            setIdCategory={setIdCategory}
            loadTasks = {loadTasks}
            tasks={tasks}
            ></Categorias>
        </main>

        <Footer></Footer>

        
    </div>
    )
    
    
}

export default Home
