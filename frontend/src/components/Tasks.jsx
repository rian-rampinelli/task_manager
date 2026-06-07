import { useState,useEffect } from "react"
import {getTasks,deleteTask,updateTask,updateTaskPartial} from "../api/tasks.js"
import Modal from "./Modal.jsx"



function Tasks({categorys}) {

    
    const [tasks, setTasks] = useState([])
    const [openModal,setOpenModal] = useState(false)



    async function loadTasks() { 
       const data = await getTasks()
       setTasks(data)
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

    return(
        <>
        <Modal loadTasks={loadTasks} categorys={categorys} isOpen={openModal}></Modal>
        <button className="bg-amber-300" onClick={() => setOpenModal(true)}>Abrir modal</button>
        

        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    
                    <div>
                        <button onClick={() => handleUpdateTaskPartial(task)}>feito</button>
                        <p>{task.title}</p>
                        <p>{task.priority}</p>
                        <p>{task.description}</p>
                        <p>{task.statusLevel}</p>
                        <p>{task.category.name?task.category.name:"Categoria não especificada"}</p>
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
