import Button from '../../components/Button'
import Categorias from '../../components/Categorias'
import NavBar from '../../components/NavBar'
import Tasks from '../../components/Tasks'
import { useState,useEffect } from 'react'
import {getTasks,createTask,deleteTask} from "../../api/tasks.js"
import {getCategorys,createCategory,deleteCategory} from "../../api/category.js"


function HomePage(){
    
    const [tasks, setTasks] = useState([])
    const [categorias,setCategorias] = useState([])

     
    async function loadTasks() {
    
    const data = await getTasks()
    setTasks(data)
    }

    
    async function handleCreateTask() {

    await createTask({
        title:"teste",
        description:"teste",
        statusLevel:"TODO",
        priority:"LOW",
        idUser:10,
        idCategory:52
    })

    await loadTasks()
    }

   
    async function handleDeleteTask(id){

    await deleteTask(id)

    loadTasks()
    }


    async function loadCategorys() {

    const data = await getCategorys()
    setCategorias(data)
    
    
    }

     
    async function handleCreateCategory() {

    await createCategory({
        name: "trabalho",
        emoji:"LOW",
        description:"teste",  
        idUser:10,
      
    })

    loadCategorys()
    }

    async function handleDeleteCategory(id) {

        await deleteCategory(id)
        await loadCategorys()
    }


    useEffect(() => {
    loadTasks()
    loadCategorys()

    }, [])
    
    return ( 
    <div>
        <NavBar></NavBar>
        
        <Categorias
        categorias ={categorias}
        createCategory={handleCreateCategory}
        deleteCategory={handleDeleteCategory}
        ></Categorias>

        <Button
        createTask= {handleCreateTask}
        >

        </Button>
        
        <Tasks 
        tasks = {tasks}
        loadTasks={loadTasks}
        deleteTask={handleDeleteTask}
        >
        
        </Tasks>
    </div>
    )
    
    
}

export default HomePage