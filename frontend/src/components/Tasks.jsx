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

    console.log(tasks)

    if(tasks.length > 0){
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
    )}
    return(
    <div className="flex justify-center mt-30">
        <h1 className="text-slate-900 font-semibold text-2xl">Sem tasks por enquanto!</h1>
    </div>)


}

export default Tasks;