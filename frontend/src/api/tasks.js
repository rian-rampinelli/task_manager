export async function getTasks() {

    const response =
        await fetch("http://localhost:8080/tasks")

    return response.json()
}

export async function createTask(task) {

    await fetch("http://localhost:8080/tasks",{
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(task)
    })
}

export async function updateTask(id, task) {

    await fetch(`http://localhost:8080/tasks/${id}`,{
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(task)
    })
}

export async function deleteTask(id) {

    await fetch(
        `http://localhost:8080/tasks/${id}`,
        {
            method:"DELETE"
        }
    )
}
