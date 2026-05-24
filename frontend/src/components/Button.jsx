function Button (){
    

    async function createTask() {

    await fetch("http://localhost:8080/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            title: "teste",
            description:"teste",
            statusLevel:"TODO",
            priority:"LOW",
            idUser:10,
            idCategory:10
        })

    })
    
    
    }
           
    return (
        <>
            <button onClick={() => createTask()}>Adicionar</button>
        </>
    )
}
export default Button