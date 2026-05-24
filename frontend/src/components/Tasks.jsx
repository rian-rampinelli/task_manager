import { useState,useEffect } from "react"

function Tasks(){
    
    
    const [tasks, setTasks] = useState([])

    useEffect(() => {

        async function loadTasks() {

        const response = await fetch("http://localhost:8080/tasks")
        const data = await response.json()
        
        setTasks(data)
    }

    loadTasks()

    }, [])

    async function deleteTask(id) {

        await fetch(`http://localhost:8080/tasks/${id}`,{
            method:"DELETE"
        })
    }
    

    return(
        <>
       
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <div>
                        <p>{task.name}</p>
                        <p>{task.priority}</p>
                        <button onClick={() => deleteTask(task.id)}>lixo</button>
                        <button>editar</button>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default Tasks


