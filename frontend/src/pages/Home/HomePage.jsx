import Button from '../../components/Button'
import Categorias from '../../components/Categorias'
import NavBar from '../../components/NavBar'
import Tasks from '../../components/Tasks'
import { useState,useEffect } from 'react'


function HomePage(){
    
    const [tasks, setTasks] = useState([])
    const [categorias,setCategorias] = useState([])

     
    async function loadTasks() {

    const response = await fetch("http://localhost:8080/tasks")
    const data = await response.json()

    setTasks(data)

    }

    async function loadCategorys() {

    const response = await fetch("http://localhost:8080/categorys")
    const data = await response.json()

    setCategorias(data)

    }


    async function deleteTask(id) {

        await fetch(`http://localhost:8080/tasks/${id}`,{
            method:"DELETE"
        })

        loadTasks()
    }

     async function deleteCategory(id) {

        await fetch(`http://localhost:8080/categorys/${id}`,{
            method:"DELETE"
        })

        loadCategorys()
    }


    

    async function createTask() {

     await fetch("http://localhost:8080/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title: "teste",
            description:"teste",
            statusLevel:"TODO",
            priority:"LOW",
            idUser:10,
            idCategory:52,
        })

        

    })
    loadTasks()
    }

    
    async function createCategory() {

    await fetch("http://localhost:8080/categorys",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name: "trabalho",
            emoji:"LOW",
            description:"teste",  
            idUser:10,
          
        })
    })
    
    loadCategorys()
   
    }

    useEffect(() => {

    loadTasks(),
    loadCategorys()

    }, [])
    
    return( 
    <div>
        <NavBar></NavBar>
        
        <Categorias
        categorias ={categorias}
        createCategory={createCategory}
        deleteCategory={deleteCategory}
        ></Categorias>

        <Button
        createTask= {createTask}
        >

        </Button>
        
        <Tasks 
        tasks = {tasks}
        loadTasks={loadTasks}
        deleteTask={deleteTask}
        >
        
        </Tasks>
    </div>
    )
    
    
}

export default HomePage