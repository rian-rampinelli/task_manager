import { useState,useEffect } from "react"

function Tasks(){
    
    
    const [tasks, setTasks] = useState([])

    useEffect(() => {

        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.log(error))

    }, [])

    return(
        <>
        <h2>Minhas tarefas</h2>
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <div>
                        <p>{task.name}</p>
                        <p>{task.priority}</p>
                        <button>lixo</button>
                        <button>editar</button>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default Tasks


