function Tasks({tasks,deleteTask}){

    return(
        <>
    
    
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    
                    <div>
                        <button>feito</button>
                        <p>{task.name}</p>
                        <p>{task.priority}</p>
                        <p>{task.description}</p>
                        <p>{task.statusLevel}</p>
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


