import { useEffect,useState } from "react"
import { getTaskByCategory } from "../api/category.js"
import { updateTaskPartial, deleteTask } from "../api/tasks.js"

function LoadCategorys({idCategory}) {

    const [tasks, setTasks] = useState([])

    async function loadTasksByCategory(id){
        const data = await getTaskByCategory(id)
        setTasks(data)
    }

    async function handleUpdateTaskPartial(task){
        await updateTaskPartial(task.id, {
            statusLevel: "DONE",
        })
    }

    async function handleDeleteTask(id){
    await deleteTask(id)
   
    }
    

    useEffect(() => {
           loadTasksByCategory(idCategory)
    
    }, [idCategory])

    return(
        <>
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

export default LoadCategorys;