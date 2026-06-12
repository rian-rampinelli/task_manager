import Categorias from '../../components/Categorias'
import NavBar from '../../components/Header.jsx'
import CreateTasks from '../../components/CreateTask.jsx'
import { useState} from 'react'
import {getCategorys,createCategory,deleteCategory} from "../../api/category.js"
import {getTaskByCategory} from "../../api/category.js"
import "./HomePage.css"


function HomePage(){
    
    const [categorias,setCategorias] = useState([])
    const [tasks,setTasks] = useState([])
    const [idCategory, setIdCategory] = useState(172)

    async function loadCategorys() {
    const data = await getCategorys()
    setCategorias(data)
    }

    async function loadTasks(idCategory){
    const data = await getTaskByCategory(idCategory)
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
    }

    return ( 
    <div id='container backend' className="mt-16">
        <NavBar></NavBar>
        
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

        <CreateTasks 
        categorys={categorias}
        idCategory={idCategory}
        loadTasks={loadTasks}
        tasks={tasks}
        setTasks={setTasks}
        >
        </CreateTasks>
    </div>
    )
    
    
}

export default HomePage
