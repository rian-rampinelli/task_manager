function Tasks({tasks,deleteTask}){

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


