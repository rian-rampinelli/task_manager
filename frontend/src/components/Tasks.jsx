import { useState,useEffect } from "react"
import {getTasks,createTask,deleteTask} from "../api/tasks.js"



function Tasks(){

    const [tasks, setTasks] = useState([])
    const [name, setName] = useState("")

     async function loadTasks() {
        
        const data = await getTasks()
        setTasks(data)
    }
    
        
        async function handleCreateTask(e) {
        e.preventDefault()
        console.log(name)
    
        await createTask({
            title:name,
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

         useEffect(() => {
            loadTasks()
        
            }, [])

    return(
        <>
        
        <form onSubmit={(e) => handleCreateTask(e)}>
            <div>
                <label>Nome da tarefa:</label>
                <input 
                type="text" 
                placeholder="Estudar" 
                value={name} 
                onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit">Adicionar Task</button>
           
        </form>
    
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    
                    <div>
                        <button>feito</button>
                        <p>{task.name}</p>
                        <p>{task.priority}</p>
                        <p>{task.description}</p>
                        <p>{task.statusLevel}</p>
                        <button onClick={() => handleDeleteTask(task.id)}>lixo</button>
                        <button>editar</button>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default Tasks


