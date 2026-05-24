function Button({createTask}){
    
    return (
        <>
            <button onClick={() => createTask()}>Adicionar Task</button>
        </>
    )
}
export default Button