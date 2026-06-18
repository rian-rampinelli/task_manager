import { useEffect } from "react"
import { updateTaskPartial, deleteTask } from "../api/tasks.js"

function Tasks({idCategory, loadTasks, tasks}) {

    async function handleUpdateTaskPartial(task){
        await updateTaskPartial(task.id, {
            statusLevel: "DONE",
        })
        await loadTasks(idCategory)
    }

    async function handleDeleteTask(id){
    await deleteTask(id)
    await loadTasks(idCategory)
    }
    

    useEffect(() => {
           loadTasks(idCategory)
    }, [idCategory])

    if(tasks.length > 0){
    return(
        <>
            <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <div className="flex justify-between mt-8">
                        <div>
                            <button
                            onClick={() => handleUpdateTaskPartial(task)}
                            className="border-2 p-2"
                            ></button>
                            <p>{task.category.name?task.category.name:"Categoria não especificada"}</p>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            <p>{task.statusLevel}</p>
                            <p>{task.priority}</p>
                        </div>
                        
                        <div className="flex items-center flex-col gap-5">
                            <button onClick={() => handleDeleteTask(task.id)}>lixo</button>
                            <button>editar</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )}
    return(
    <div className="flex justify-center mt-30">
        <h1 className="text-zinc-950 font-semibold text-2xl">Sem tasks por enquanto!</h1>
    </div>)


}

export default Tasks;
