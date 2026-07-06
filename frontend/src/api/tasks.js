export async function getAllTasksByUser() {
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:8080/tasks")
        headers: {
            "Authorization"; `Bearer ${token}`
        }

    return response.json()
}

export async function createTask(task) {
    const token = localStorage.getItem("token")
    await fetch("http://localhost:8080/tasks",{
        method:"POST",

        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(task)
    })
}

export async function updateTask(id, task) {
    const token = localStorage.getItem("token")
    await fetch(`http://localhost:8080/tasks/${id}`,{
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(task)
    })
}

export async function updateTaskPartial(id, task) {
    const token = localStorage.getItem("token")
    await fetch(`http://localhost:8080/tasks/${id}`,{
        method:"PATCH",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(task)
    })
}

export async function deleteTask(id) {
    const token = localStorage.getItem("token")
    await fetch(
        `http://localhost:8080/tasks/${id}`,
        {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }},
    )
}
