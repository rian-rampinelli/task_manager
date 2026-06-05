import { useState,useEffect } from "react"
import {getTasks,createTask,deleteTask,updateTask,updateTaskPartial} from "../api/tasks.js"



function Tasks({categorys}) {

    
    const [tasks, setTasks] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [statusLevel, setStatusLevel] = useState("TODO")
    const [priority, setPriority] = useState("LOW")
    const [idUser, setIdUser] = useState(10)
    const [idCategory, setIdCategory] = useState(52)
   

     async function loadTasks() { 
       const data = await getTasks()
       setTasks(data)
    }
    
        
    async function handleCreateTask(e) {
    e.preventDefault()
  
    await createTask({
        title:name,
        description:description,
        statusLevel:statusLevel,
        priority:priority,
        idUser:idUser,
        idCategory:idCategory
    })

    await loadTasks()
    }
    
       
    async function handleDeleteTask(id){
    await deleteTask(id)
    loadTasks()
    }

    async function handleUpdateTask(task){
    await updateTask(task.id, {
        title:task.title,
        description: task.description,
        priority: task.priority,
        statusLevel: "DONE",
        idUser: task.userId,
        idCategory: task.category.id
    })
    await loadTasks()
    }

    
    async function handleUpdateTaskPartial(task){
    await updateTaskPartial(task.id, {
        statusLevel: "DONE",
    })
    await loadTasks()
    }

    useEffect(() => {
       loadTasks()

    }, [])

    console.log(tasks)

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
             <div>
                <label>Descrição:</label>
                <input 
                type="text" 
                placeholder="Terminar o projeto de React" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Prioridade:</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <div>
                <label>Categoria:</label>
                <select value={idCategory} onChange={(e) => setIdCategory(e.target.value)}>
                {categorys.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
                </select>        
            </div>

            <button type="submit">Adicionar Task</button>
           
        </form>
    
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    
                    <div>
                        <button onClick={() => handleUpdateTaskPartial(task)}>feito</button>
                        <p>{task.title}</p>
                        <p>{task.priority}</p>
                        <p>{task.description}</p>
                        <p>{task.statusLevel}</p>
                        <p>{task.category.name}</p>
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


